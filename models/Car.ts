import mongoose from 'mongoose';

const CarSchema = new mongoose.Schema({
  id: Number,
  make: String,
  model: String,
  year: Number,
  fueltype: String,
  kilometers: Number,
  details: String,
  price: Number,
  photourl: String,
});

export default mongoose.models.Car || mongoose.model('Car', CarSchema);

export type CarModel = {
  id: number;
  make: string;
  model: string;
  year: number;
  fueltype: string;
  kilometers: number;
  details: string;
  price: number;
  photourl: string;
  _id?: string;
  __v: number;
};
