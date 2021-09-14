import mongoose from 'mongoose'
import { Value as ValueSchema } from '../models/Value'
import { AccountSchema } from '../models/Account'
import { CarSchema } from '../models/Car'
import { HouseSchema } from '../models/House'
import { JobSchema } from '../models/Job'

class DbContext {
    Values = mongoose.model('Value', ValueSchema);
    Account = mongoose.model('Account', AccountSchema);
    Cars = mongoose.model('Car', CarSchema)
  Houses = mongoose.model('House', HouseSchema)

  Jobs = mongoose.model('Job', JobSchema)
}

export const dbContext = new DbContext()
