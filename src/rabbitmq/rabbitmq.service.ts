import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import Config from '../config/keys'
import * as amqp from 'amqplib'


@Injectable()
export class RabbitMQService  {
    private client: ClientProxy;
    private connection: amqp.Connection;

    constructor(){
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [Config.AMQPS_URL],
                queue: 'user_queue',
                queueOptions: { durable: false },
            },
        });
    }

// Connect to rabbitMQ
async connectRabbitMQ(url: string): Promise<void>{
    ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
            urls: [url],
            queue: 'user_queue',
            queueOptions: { durable: false },
        },
    });
}

// Send notification on new user created
async sendNotification(createUserDto: CreateUserDto) : Promise<{}> {
      return await this.client.emit('user_created', createUserDto);
}




}
