import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const HouseSchema = new Schema({
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  year: { type: Number },
  levels: { type: Number, required: true },
  description: { type: String, required: true },
  imgUrl: { type: String },
  price: { type: Number, required: true }

}, { timestamps: true, toJSON: { virtuals: true } })
