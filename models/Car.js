import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CarSchema = new Schema({
  make: {
    type: String,
    required: [true, 'Who makes it?'],
    minlength: 3,
    // enum: ['honda', 'hyundai', 'ford', 'tesla'],
    lowercase: true
  },
  model: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  img: { type: String, default: 'https://proximaride.com/images/car_placeholder2.png' },
  year: { type: Number, min: 1900, max: 3000 },
  description: { type: String, required: true },

  // RELATIONSHIP more here later
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

CarSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  ref: 'Account',
  justOne: true
})
