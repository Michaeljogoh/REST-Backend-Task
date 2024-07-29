import { Injectable, ArgumentsHost } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import  * as fs from 'fs';
import * as path from "path";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Image } from "./entities/download.entity";
import { Response } from 'express';

 
@Injectable()
 export class DownloadImageService {
    constructor(@InjectModel('Image') 
    private readonly imageModel : Model<Image>, 
    private readonly httpService: HttpService){}
   
  // Download Image ans Save to Database
  async downloadImageFromLink(imageUrl: string, userId: number): Promise<any>  {
        const url = new URL(imageUrl);
        const imageName =  path.basename(url.pathname);
        // Create write stream
        const file = fs.createWriteStream(imageName);
        // Get image as steam and save to filesystem
        this.httpService.get(imageUrl, {responseType:'stream'}).subscribe({next: data => data.data.pipe(file)});
        // Get image as Buffer 
        this.httpService.get(imageUrl, { responseType:"arraybuffer"}).subscribe({next: async (data) => {
        // Convert image buffer and convert to base64
        const dataBase64 = Buffer.from(data.data, 'binary').toString('base64');
        // Save entry to mongoDB
         await this.imageModel.create({userId: userId, image: data.data, hash: dataBase64 });
         
         // Retrieve data from DB
         const findBase64Query = this.imageModel.findOne({userId: {$eq: userId}});
         const findBase64 = await findBase64Query;
         const returnBase64 = findBase64.hash;
         // Return previous save file in  base64 
         // console.log(returnBase64)
         return returnBase64
        }});
        
     };



  // Remove file from filesystem and DB
  async deleteImageFromLink( imageUrl: string, userId: number) {
        // remove from file system
        const url = new URL(imageUrl);
        const imageName =  path.basename(url.pathname);
        fs.unlink(imageName, ()=>{});
        // remove from DB 
        this.imageModel.findOneAndDelete({userId: {$eq: userId}},  (err: string) =>{
        if (err){ 
        throw err
        } 
        });

}
     

}
