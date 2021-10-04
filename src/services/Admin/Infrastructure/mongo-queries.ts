import { getConection, managmentMongoError, stringToObjectId } from '@Loaders/mongo'
import { ObjectID } from 'mongodb'
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

  public async findCompanyUsers(id: any): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('companies')
      const usersData = await collection.aggregate([
        {
          $match: {
            _id: new ObjectID(id),
          }
        },
        {
          '$lookup': {
            'from': 'users',
            'localField': 'users',
            'foreignField': '_id',
            'as': 'users'
          }
        },
        {
          '$project': {
            users: {
                password: 0,
                company: 0,
            }
          }
        },
      ]).toArray();

      return usersData
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

  public async updateCompany(id: string, data?: any): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('companies')
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

  public async findCompany(id: string, projection?: any): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('companies')
      let user = await collection.findOne(
        {
          _id: stringToObjectId(id),
        },
        {
          projection: {
            ...projection,
            users: 0,
            __v: 0,
          },
        }
      )
      return user
    } catch (error:any) {
      managmentMongoError(error)
    }
  }

  public async registerCompany(data: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('companies');

      let newCompany = await collection.insertOne(data);
      return newCompany.ops[0];
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

}
