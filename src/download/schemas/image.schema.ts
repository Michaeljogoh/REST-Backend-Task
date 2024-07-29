import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
  userId: Number,
  image: {
    type: Buffer,
  },
  hash: String,
});






