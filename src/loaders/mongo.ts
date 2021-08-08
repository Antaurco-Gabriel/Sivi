/*  --------------------------------------------------
 *
 *  This section starts connection with Mongo database
 *
 *  We implements hexagonal arquitecture filosofy
 *  in a modular monolith
 *
 *  Remember, this arquitecture have 4 layers
 *
 *  - API layer
 *  - Infrastructure layer
 *  - UseCase layer
 *  - Domain layer
 *
 *  --------------------------------------------------
 *  Implements API layer
 *  --------------------------------------------------
 *
 *  This file only import
 *
 *  1. Mongoose dependence
 *  2. Keys
 *
 *  Functions:
 *
 *  1. Start conections whit Mongo database managment
 *  2. Start mongo variables conections
 *
 */
import { mongodb } from '../config/key'
import { default as connectMongoDBSession } from 'connect-mongo'
import { MongoClient, MongoClientOptions, Db, MongoError, ObjectID } from 'mongodb'

let dataBase: Db
export async function connect() {
  try {
    let ops: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    let db: MongoClient = await MongoClient.connect(mongodb.MONGO_URI, ops)
    dataBase = db.db()
    console.log(`
      ########################################
      ║ ⚔    Mongo Database connected     ⚔  ║
      ########################################`)
    return dataBase
  } catch (error) {
    console.log(`
      ########################################
      ║ ☠    Mongo Database is dead     ☠  ║
      ########################################`)
  }
}

export const storeMongo = (session: any) => {
  const MongoDBStore = connectMongoDBSession(session)
  var store = new MongoDBStore({
    url: mongodb.MONGO_URI,
    autoReconnect: true,
  })
  return store
}

export function getConection(): Db {
  return dataBase
}

export function managmentMongoError(error: MongoError): string {
  console.log(`
      ########################################
      ║  🤬🤬  Hubo un error en Mongo   🤬🤬 ║
      ########################################
		`)
  console.log(error.name)
  console.log(`Mensaje: ${error.message} `)
  return JSON.stringify({ status: 500, message: 'Error interno, intentelo más tarde' })
}

export const stringToObjectId = (text: string) => new ObjectID(text)
