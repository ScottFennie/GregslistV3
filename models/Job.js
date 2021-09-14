import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const JobSchema = new Schema({
  title: { type: String, required: true },
  rate: { type: Number, required: true },
  description: { type: String },
  company: { type: String, required: true },
  hours: { type: Number, required: true }
})
