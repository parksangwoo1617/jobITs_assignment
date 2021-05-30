import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { User } from "../model/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    static getQueryRepository() {
        return getCustomRepository(UserRepository);
    }
}