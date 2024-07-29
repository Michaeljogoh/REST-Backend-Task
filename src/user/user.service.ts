import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { AxiosResponse } from 'axios';
import { map, Observable, from } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { DownloadImageService } from '../download/download.service';



@Injectable()
export class UserService {
  private imageUrl : string
  private userId: number
  constructor(@InjectModel('User') 
  private readonly userModel: Model<User>,
  private readonly httpService: HttpService,
  private readonly downloadImageService : DownloadImageService,

){}

  // Create User
  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userModel.create(createUserDto);
  }

  // Retrieve Data  
  async findById(userId: number) : Promise<Observable<AxiosResponse<{}, {}>>>  {
  return await from(this.httpService.get(`https://reqres.in/api/users/${userId}`).pipe(map((res) => res.data)));
  }

  // Retrieve Avatar
  async retrieveAvatar(userId: number) {
   return this.httpService.get(`https://reqres.in/api/users/${userId}`)
    .pipe(map((res) => res.data.data )).subscribe(res => {
      this.imageUrl = res.avatar
      this.userId = res.id
      this.downloadImageService.downloadImageFromLink(this.imageUrl, this.userId)
    })
  }

  // Delete Avatar  
  async deleteAvatar(userId: number): Promise<void>{
    this.httpService.get(`https://reqres.in/api/users/${userId}`)
    .pipe(map((res) => res.data.data )).subscribe(res => {
      this.imageUrl = res.avatar
      this.userId = res.id
      this.downloadImageService.deleteImageFromLink(this.imageUrl, this.userId);
      })
  }

  // Delete all user after server stops
  async deleteAll() {
      return await this.userModel.deleteMany();
  }



}
