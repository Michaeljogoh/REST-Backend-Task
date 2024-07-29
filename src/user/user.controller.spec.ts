import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RabbitMQService } from '../rabbitmq/rabbitmq.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let rabbitMQService: RabbitMQService;

  beforeEach(async () => {
    // Create mocks for services
    const userServiceMock = {
      create: jest.fn(),
      findById: jest.fn(),
      retrieveAvatar: jest.fn(),
      deleteAvatar: jest.fn(),
      deleteAll: jest.fn(),
    };

    const rabbitMQServiceMock = {
      sendNotification: jest.fn(),
    };

    // Setup testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: RabbitMQService, useValue: rabbitMQServiceMock },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    rabbitMQService = module.get<RabbitMQService>(RabbitMQService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should call rabbitMQService.sendNotification and userService.create', async () => {
     const createUserDto = {
      name:'test',
      email:'test@gmail.com',
      message:'test content'
     } as CreateUserDto;

    await userController.create(createUserDto);
    expect(rabbitMQService.sendNotification).toHaveBeenCalledWith(createUserDto);
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should call userService.findById with correct userId', async () => {
    const userId = 1;
    await userController.findById(userId);
    expect(userService.findById).toHaveBeenCalledWith(userId);
  });
 

  describe('retrieveAvatar', () => {
    it('should call userService.retrieveAvatar with correct userId', async () => {
      const userId = 5;
      await userController.retrieveAvatar(userId);
      expect(userService.retrieveAvatar).toHaveBeenCalledWith(userId);
    });
  });

  it('should call userService.deleteAvatar with correct userId', async () => {
    const userId = 7;
    await userController.deleteAvatar(userId);
    expect(userService.deleteAvatar).toHaveBeenCalledWith(userId);
  });
 
  it('should call userService.deleteAll', async () => {
    await userController.deleteAll();
    expect(userService.deleteAll).toHaveBeenCalled();
  });


});

 