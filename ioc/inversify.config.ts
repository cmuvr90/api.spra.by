import {Container} from "inversify";
import {TYPES} from "./types";
import {UsersService} from "@/services/UsersService";
import {IUsersService} from "@/services/UsersService/interface";
import Users from "@/db/models/Users";
import {IUserModel} from "@/db/models/types/IUsers";

const container = new Container();

container.bind<IUsersService>(TYPES.UsersService).to(UsersService)
container.bind<IUserModel>(TYPES.UserModel).toDynamicValue(() => Users)

export default container;