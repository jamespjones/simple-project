import * as awilix from "awilix";
import {ConfigService} from "./config/ConfigService";
import {ConfigServiceImpl} from "./config/ConfigServiceImpl";
import {MongodbService} from "./mongodb/MongodbService";
import {LoggerFactory} from "./logger/LoggerFactory";
import {LoggerFactoryLocal} from "./logger/LoggerFactoryLocal";
import {MongodbServiceLocal} from "./mongodb/MongodbServiceLocal";

export type ServiceContainerCradle = {
  configService: ConfigService;
  mongodbService: MongodbService;
  loggerFactory: LoggerFactory;

  userService: UserService;

  // Repositories
  userRepository: UserRepository;
};

const serviceContainer = awilix.createContainer<ServiceContainerCradle>({
  injectionMode: awilix.InjectionMode.PROXY,
});

serviceContainer.register({ configService: awilix.asClass(ConfigServiceImpl).singleton() });
serviceContainer.register({ loggerFactory: awilix.asClass(LoggerFactoryLocal).singleton() });
serviceContainer.register({ mongodbService: awilix.asClass(MongodbServiceLocal).singleton() });

// serviceContainer.register({ userService: awilix.asClass(UserServiceImpl) });
// serviceContainer.register({ userRepository: awilix.asClass(UserRepositoryImpl) });


export { serviceContainer };
