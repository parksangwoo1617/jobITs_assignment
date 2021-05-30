import { AdminRepository } from "../entity/entity-repository/adminRepository";
import { UserRepository } from "../entity/entity-repository/userRepository";
import { ForbiddenError, BadRequestError } from "../shared/exception";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { UserDto, UserTokenDto } from "src/shared/dto";
import bcrypt from "bcrypt";

export class AuthService {
    constructor(
        private adminRepository: AdminRepository,
        private userRepository: UserRepository
    ) { }

    private async issuanceToken(user_id: number, type: string): Promise<string> {
        return jwt.sign({
            sub: `${user_id}`,
            type: type,
        }, config.jwtSecret, {
            algorithm: "HS256",
            expiresIn: type === "access" ? "2h": "14d"
        });
    }

    public async login(user: UserDto): Promise<UserTokenDto> {
        const existUser = await this.userRepository.findOne({
            where: { userId: user.userId }
        });

        const admin = await this.adminRepository.findOne({
            where: { adminId: user.userId }
        });
        if(!existUser && !admin) {
            throw new BadRequestError();
        } else if(existUser) {
            const isUserMatch = await bcrypt.compare(user.password, existUser.password);
            if(!isUserMatch) {
                throw new BadRequestError();
            }
            return {
                "access_token": await this.issuanceToken(existUser.id, "access"),
                "refresh_token": await this.issuanceToken(existUser.id, "refresh")
            }
        } else if(admin) {
            const isAdminMatch = await bcrypt.compare(user.password, admin.password);
            if(!isAdminMatch) {
                throw new BadRequestError();
            }
            return {
                "access_token": await this.issuanceToken(admin.id, "access"),
                "refresh_token": await this.issuanceToken(admin.id, "refresh"),
            }
        }
    } 

    public async refreshToken(user_id: number, refreshToken: string): Promise<UserTokenDto> {
        const accessToken: string = await this.issuanceToken(user_id, "access");
        return {
            "access_token": accessToken,
            "refresh_token": refreshToken
        };
    }

    public async createUser(user: UserDto): Promise<void> {
        const admin = await this.adminRepository.findOne({
            where: { adminId: user.userId }
        })
        const existUser = await this.userRepository.findOne({
            where: { userId: user.userId }
        })
        if(admin || existUser) {
            throw new BadRequestError();
        }
        const createUser = this.userRepository.create(user);
        await this.userRepository.save(createUser);
    }
}