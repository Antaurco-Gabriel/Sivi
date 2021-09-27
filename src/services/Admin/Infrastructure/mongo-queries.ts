import { getConection, managmentMongoError, stringToObjectId } from '@Loaders/mongo'
import { User } from '../Domain/types'

export class Mongo {
  public async findAllClients(
    filter?: any,
    projection?: any,
    sort?: any
  ): Promise<User[]> {
    try {
      const database = getConection()
      const collection = database.collection('users')
      let users: User[] = await collection
        .find(filter, {
          projection: {
            ...projection,
          },
        })
        .sort({ ...sort })
        .toArray()
      console.log(users[0])
      console.log(typeof users)
      return users
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }

  public async findAllCompanies(
    filter?: any,
    projection?: any,
    sort?: any
  ): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('companies')
      let companies: any[] = await collection
        .find(filter, {
          projection: {
            ...projection,
          },
        })
        .sort({ ...sort })
        .toArray()

      return companies
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }

  public async updateOne(id: string, data?: any): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('users')
      await collection.findOneAndUpdate(
        {
          _id: stringToObjectId(id),
        },
        {
          $set: {
            ...data,
          },
        }
      )
    } catch (error:any) {
      managmentMongoError(error)
    }
  }

  public async findById(id: string, projection?: any): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('users')
      let user = await collection.findOne(
        {
          _id: stringToObjectId(id),
        },
        {
          projection: {
            ...projection,
            password: 0,
            __v: 0,
          },
        }
      )
      return user
    } catch (error:any) {
      managmentMongoError(error)
    }
  }
}
