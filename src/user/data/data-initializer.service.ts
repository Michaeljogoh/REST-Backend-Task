import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserService } from "../user.service";
import { OnModuleInit, OnModuleDestroy } from "@nestjs/common";



@Injectable()
export class DataInitializerService implements OnModuleInit, OnModuleDestroy {
  private data: CreateUserDto[] = [
    {
      name: "michael",
      email: "mc@gmail.com",
      message: "mcHuJ",
    },
    {
       name: "james",
       email: "mk@gmail.com",
       message: "just",
    }
  ];

  constructor(private userService: UserService) {}
  // Create users on application start
  async onModuleInit(): Promise<void>{
        this.data.forEach(d => {
        this.userService.create(d)
     });
  }


// Delete users on application shutdown
 async onModuleDestroy(): Promise<void> {
    await this.userService.deleteAll();
  }


}
