import { Auth0Provider } from '@bcwdev/auth0provider'
import { housesService } from '../services/HouseService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class HouseController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getHouses)
      .get('/:houseId', this.getHouse)
      .use(Auth0Provider.getAuthorizedUserInfo) // middleware
      .post('', this.createHouse)
      .delete('/:houseId', this.removeHouse)
      .put('/:houseId', this.editHouse)
  }

  async getHouses(req, res, next) {
    try {
      const houses = await housesService.getHouses(req.query)
      res.send(houses)
    } catch (error) {
      next(error)
    }
  }

  async getHouse(req, res, next) {
    try {
      const house = await housesService.getHouseById(req.params.houseId)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async createHouse(req, res, next) {
    try {
      logger.log('who is the user?', req.userInfo)
      // REVIEW IMPORTANT never ever ever ever trust the client
      // force the creatorId to be the loggedin user
      // if (!req.userInfo.email_verified) {
      //   throw new UnAuthorized('Please validate your email')
      // }
      req.body.creatorId = req.userInfo.id
      const house = await housesService.createHouse(req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async removeHouse(req, res, next) {
    try {
      const house = await housesService.removeHouse(req.params.houseId, req.userInfo.id)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }

  async editHouse(req, res, next) {
    try {
      const house = await housesService.editHouse(req.params.houseId, req.userInfo.id, req.body)
      res.send(house)
    } catch (error) {
      next(error)
    }
  }
}
