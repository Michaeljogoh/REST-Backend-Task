import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpService } from '@nestjs/axios';
import { DownloadImageService } from '../download/download.service';
import { HttpModule } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('UserService', () => {
  let userService: UserService;
  let downloadImageService: DownloadImageService;
  let httpService: HttpService;
  let userModel: Model<User>

  httpService = { 
    get: jest.fn() 
  } as unknown as HttpService;

  downloadImageService = { 
    downloadImageFromLink: jest.fn(),
    deleteImageFromLink: jest.fn() 
  } as unknown as DownloadImageService;


 const mockUserService = {
    create: jest.fn(),
    deleteMany: jest.fn()
 }

 


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [UserService,
      { provide: HttpService, useValue: httpService },
      { provide: DownloadImageService, useValue: downloadImageService },
      { provide: getModelToken('User'), useValue: mockUserService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    downloadImageService = module.get<DownloadImageService>(DownloadImageService);
    userModel = module.get<Model<User>>(getModelToken('User'))

  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  
  it('should create and return user', async ()=>{
    // arrange
     const createUserDto = {
      name:'test',
      email:'test@gmail.com',
      message:'test content'
     } as CreateUserDto;

     jest.spyOn(userModel, 'create').mockImplementationOnce(()=> Promise.resolve(createUserDto));
    // Act
    const result = await userService.create(createUserDto);
    // Assert
    expect(mockUserService.create).toBeCalled();
    expect(result).toEqual(createUserDto);

  });


  it('should retrieve user data by ID', async () => {
    // Arrange
    const userId = 5;
    const mockResponse: AxiosResponse<{}, {}> = {
      data:   {
        id: 5,
        email: "charles.morris@reqres.in",
        first_name: "Charles",
        last_name: "Morris",
        avatar: "https://reqres.in/img/faces/5-image.jpg"
    },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined
      },
    };
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
     // Act
    (await userService.findById(userId)).subscribe(response => {
       // Assert
      expect(response).toEqual(mockResponse.data);
      expect(httpService.get).toHaveBeenCalledWith(`https://reqres.in/api/users/${userId}`);
      
    });
  });

  it('should retrieve avatar and call downloadImageFromLink', (done) => {
    // Arrange
    const userId = 5;
    const avatarUrl = 'https://reqres.in/img/faces/5-image.jpg';
    const response = { data: { 
      data: {
       id: 5,
       email: "charles.morris@reqres.in",
       first_name: "Charles",
       last_name: "Morris",
       avatar: "https://reqres.in/img/faces/5-image.jpg"
     }} } as AxiosResponse<any, any>;

    jest.spyOn(httpService, 'get').mockReturnValue(of(response));
    jest.spyOn(downloadImageService, 'downloadImageFromLink').mockResolvedValue(undefined);
    // Act
    userService.retrieveAvatar(userId).then(() => {
       // Assert
      expect(httpService.get).toHaveBeenCalledWith(`https://reqres.in/api/users/${userId}`);
      expect(downloadImageService.downloadImageFromLink).toHaveBeenCalledWith(avatarUrl, 5);
      done();
    });

    });

    it('should retrieve user data and call deleteImageFromLink', (done) => {
      // Arrange
      const userId = 1;
      const avatarUrl = 'https://reqres.in/img/faces/1-image.jpg'
      const mockResponse: AxiosResponse<any> = {
        data: { 
            data: {
            id : 1,
            email: "george.bluth@reqres.in",
            first_name : "George",
            last_name : "Bluth",
            avatar: "https://reqres.in/img/faces/1-image.jpg"
        }
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };
  
      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
      jest.spyOn(downloadImageService, 'deleteImageFromLink').mockResolvedValue(undefined);
       // Act
      userService.deleteAvatar(userId).then(() => {
         // Assert
        expect(httpService.get).toHaveBeenCalledWith(`https://reqres.in/api/users/${userId}`);
        expect(downloadImageService.deleteImageFromLink).toHaveBeenCalledWith(avatarUrl, userId);
        done();
      });
    });

     
  it('should call deleteMany on userModel', async () => {
    // Arrange
    jest.spyOn(userModel, 'deleteMany').mockResolvedValue(undefined); 

    // Act
    await userService.deleteAll();

    // Assert
    expect(userModel.deleteMany).toHaveBeenCalled();
  });

  

});