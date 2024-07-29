import { Test, TestingModule } from '@nestjs/testing';
import { DownloadImageService } from './download.service';
import { getModelToken } from '@nestjs/mongoose';
import { Image } from './entities/download.entity';
import { Model } from 'mongoose';
import { HttpModule } from '@nestjs/axios';
import { of } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as path  from 'path'
import * as fs  from 'fs'
import { jest } from '@jest/globals';

jest.mock('fs');
jest.mock('@nestjs/axios');
jest.mock('mongoose');
const mockUnlink  = fs.unlink as unknown as jest.Mock




describe('DownloadService', () => {
  let downloadService: DownloadImageService;
  let downloadModel: Model<Image>
  let httpService: HttpService

 
  downloadModel = {
    create: jest.fn(),
    findOne: jest.fn(),
    findOneAndDelete: jest.fn()
   } as unknown as Model<Image>;

  httpService = { get: jest.fn() } as unknown as HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[HttpModule],
      providers: [DownloadImageService,
        { provide: getModelToken('Image'), useValue: downloadModel },
        {provide: HttpService, useValue: httpService }
        
      ],
    }).compile();

   
    httpService = module.get<HttpService>(HttpService);
    downloadService = module.get<DownloadImageService>(DownloadImageService);
    downloadModel = module.get<Model<Image>>(getModelToken("Image"));
  });

  it('should be defined', () => {
    expect(downloadService).toBeDefined();
  });


  it('should download and process image correctly', async () => {
    const mockImageUrl = 'https://reqres.in/img/faces/5-image.jpg';
    const mockUserId = 5;
    const mockImageBuffer = Buffer.from('mock image data');
    const mockBase64 = mockImageBuffer.toString('base64');
     // Arrange
    // Mock file system 
    (fs.createWriteStream as jest.Mock).mockReturnValueOnce({
      write: jest.fn(),
      end: jest.fn(),
    });

    // Mock HTTP service 
    (httpService.get as jest.Mock)
      .mockReturnValueOnce(of({ data: { pipe: jest.fn() } })) 
      .mockReturnValueOnce(of({ data: mockImageBuffer })); 

    // Mock 
    const newImage = { userId: mockUserId, image: mockImageBuffer, hash: mockBase64 }
    
    jest.spyOn(downloadModel, 'create').mockImplementationOnce(()=> Promise.resolve(newImage));
    jest.spyOn(downloadModel, 'findOne').mockResolvedValueOnce({hash: mockBase64})

    // Act
    await downloadService.downloadImageFromLink(mockImageUrl, mockUserId);
    // Assert
    expect(fs.createWriteStream).toHaveBeenCalledWith('5-image.jpg');
    expect(fs.createWriteStream).toHaveBeenCalled();
    expect(downloadModel.create).toBeDefined()
    expect(downloadModel.create).toHaveBeenCalledTimes(1);
    expect(downloadModel.findOne).toHaveBeenCalledTimes(1);
    expect(downloadModel.findOne).toHaveBeenCalledWith({ userId: { $eq: 5 } })
  
    });



  it('should remove image from file system and database', async () => {
    const imageUrl = 'https://reqres.in/img/faces/1-image.jpg';
    const userId = 1;

    // Arrange
    mockUnlink.mockImplementation((path, callback) => callback); 

    jest.spyOn(downloadModel, 'findOneAndDelete').mockResolvedValue(null); 

    // Act
    await downloadService.deleteImageFromLink(imageUrl, userId);

    // Assert
    const url = new URL(imageUrl);
    const imageName = path.basename(url.pathname);

    // Assert
    expect(mockUnlink).toHaveBeenCalledWith(imageName, expect.any(Function));
    expect(downloadModel.findOneAndDelete).toHaveBeenCalled();
  });

});
