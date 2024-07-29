import { Test, TestingModule } from '@nestjs/testing';
import { RabbitMQService } from './rabbitmq.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import Config from '../config/keys'


describe('RabbitmqService', () => {
  let rabbitMQService: RabbitMQService;
  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMQService],
    }).compile();

    rabbitMQService = module.get<RabbitMQService>(RabbitMQService);
  
  });

  
  // RabbitService 
  it('should be defined', () => {
    expect(rabbitMQService).toBeDefined();
  });
  // RabbitMQ connect successfully 
  it('should connect to RabbitMQ successfully', async () => {
      await rabbitMQService.connectRabbitMQ(Config.AMQPS_URL);
      expect(rabbitMQService['connectRabbitMQ']).toBeDefined();

  });
// Send notification successfully
 it('should send notification successfully', async () => {
     const notification = { 
        name: 'test rabbitMQ',
        email:'test@rabbitmq.com',
        message:'test message'
      } as CreateUserDto;

     const sendNotificationSpy = jest.spyOn(rabbitMQService, 'sendNotification');

     await rabbitMQService.sendNotification(notification);

    expect(sendNotificationSpy).toBeCalledWith(notification);
   
});


});
