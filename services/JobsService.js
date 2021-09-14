import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class JobsService {
  async getJobById(jobId) {
    const job = await dbContext.Jobs.findById(jobId).populate('creator', 'name picture')
    if (!job) {
      throw new BadRequest('Invalid Car Id')
    }
    return job
  }

  async editJob(jobId, userId, jobData) {
    const job = await this.getJobById(jobId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    job.title = jobData.title || job.title
    job.rate = jobData.rate || job.rate
    job.company = jobData.company || job.company
    job.description = jobData.description || job.description
    job.hours = jobData.hours || job.hours
    await job.save()
    return job
    // const car = await dbContext.Cars.findOneAndUpdate({ _id: carId, creatorId: userId }, carData)
    // return car
  }

  async removeJob(jobId, userId) {
    const job = await this.getJobById(jobId)
    if (userId !== job.creatorId.toString()) {
      throw new Forbidden('You shall not pass!!!')
    }
    await job.remove()
    return job
  }

  async createJob(jobData) {
    const job = await dbContext.Jobs.create(jobData)
    return job
  }

  async getJobs(query) {
    const jobs = await dbContext.Jobs.find(query).populate('creator', 'name picture')
    return jobs
  }
}

export const jobsService = new JobsService()
