import { getConection, stringToObjectId, managmentMongoError } from '@Loaders/mongo'
import { ObjectId, ObjectID } from 'mongodb';

export class Mongo {

  public async findPositiveSheets(idCompany: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('sheets');
      let sheets = await collection.find({
        company: new ObjectID(idCompany),
        isPositive: true,
      }, { }).toArray();
      return sheets;
    }catch(error){
      throw managmentMongoError(error);
    }
  }

  public async deleteSheet(id: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('sheets');
      let sheet = await collection.deleteOne({
        _id: new ObjectID(id),
      })
      return sheet;
    }catch(error){
      throw managmentMongoError(error);
    }
  }

}
