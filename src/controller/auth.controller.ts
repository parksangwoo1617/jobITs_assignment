import { AdminRepository } from "../entity/entity-repository/adminRepository";
import { UserRepository } from "../entity/entity-repository/userRepository";
import { AuthService } from "../service/auth.service";
import { BusinessLogic } from "../shared/BusinessLogicInterface";

export class AuthController {
    private authService: AuthService = new AuthService(
        AdminRepository.getQueryRepository(),
        UserRepository.getQueryRepository()
    );

    public login: BusinessLogic = async (req, res, next) => {
        const token = await this.authService.login(req.body);
        res.status(200).json(token);
    }

    public refreshToken: BusinessLogic = async (req, res, next) => {
        const refreshToken: string = req.headers["refresh-token"] as string;
        const response = await this.authService.refreshToken(+req.decoded.sub, refreshToken.slice(7));
        res.status(200).json(response);
    }

    public createUser: BusinessLogic = async (req, res, next) => {
        await this.authService.createUser(req.body);
        res.status(201).json({
            message: "success"
        })
    }
}