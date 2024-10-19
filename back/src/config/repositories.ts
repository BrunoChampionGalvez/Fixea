import { User } from "../users/users.entity";
import { myDataSource } from "./app-data-source";

export const usersRepository = myDataSource.getRepository(User)
