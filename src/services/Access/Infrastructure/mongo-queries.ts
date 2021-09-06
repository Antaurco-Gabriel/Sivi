import { getConection, stringToObjectId, managmentMongoError } from '@Loaders/mongo'

export class Mongo {
  public async existEmail(email: string): Promise<boolean> {
    try {
      const database = getConection()
      const collection = database.collection('users')
      let exists: boolean = (await collection.find({ email: email }).count()) > 0
      return exists
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }

  public async existToken(token: string): Promise<boolean> {
    try {
      const database = getConection()
      const collection = database.collection('users')
      let exists: boolean = (await collection.find({ emailToken: token }).count()) > 0
      return exists
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }

  public async findById(id: string): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('users')
      let user = await collection.findOne(
        {
          _id: stringToObjectId(id),
        },
        { projection: { password: 0, __v: 0 } }
      )
      return user
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }

  public async findUser(filter: any, projection?: any): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('users')
      let user = await collection.findOne(filter, {
        projection: { ...projection, password: 0, __v: 0 },
      })
      return user
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }

  public async createUser(email: string, password: string): Promise<any> {
    try {
      const database = getConection()
      const collection = database.collection('users')
      let newUser = await collection.insertOne({
        email: email,
        password: password,
        type: 0,
      })
      return newUser.ops[0]
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }

  public async updateToken(email: string, token: string, date: string): Promise<string> {
    try {
      const database = getConection()
      const collection = database.collection('users')

      let user = await collection.findOneAndUpdate(
        {
          email: email,
        },
        {
          $set: {
            emailToken: token,
            expireToken: date,
          },
        },
        { projection: { emailToken: 1, _id: 0 }, returnOriginal: false }
      )

      return user.value.emailToken
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }

  public async updatePasswordReset(password: string, token: string): Promise<boolean> {
    try {
      const database = getConection()
      const collection = database.collection('users')

      let user = await collection.findOneAndUpdate(
        {
          token: token,
        },
        {
          $set: {
            password: password,
          },
        },
        { projection: { email: 1, _id: 0 }, returnOriginal: false }
      )

      return user.value.email !== undefined
    } catch (error:any) {
      throw managmentMongoError(error)
    }
  }
}
