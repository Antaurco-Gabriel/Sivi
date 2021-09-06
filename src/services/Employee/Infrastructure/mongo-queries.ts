import { getConection, stringToObjectId, managmentMongoError } from '@Loaders/mongo'
import { ObjectId, ObjectID } from 'mongodb';

export class Mongo {

  public async findAllCompanies(): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('companies');
      let companies = await collection.find({}, {}).toArray();
      return companies;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async findCompany(id: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('companies');
      
      const company = await collection.aggregate([
        {
          $match: {_id: new ObjectID(id)}
        },
        {
          '$lookup': {
            'from': 'users',
            'localField': 'rrhh',
            'foreignField': '_id',
            'as': 'rrhh'
          }
        },
        { '$unwind': { path: '$rrhh' } },
        {
          '$lookup': {
            'from': 'users',
            'localField': 'doctor',
            'foreignField': '_id',
            'as': 'doctor'
          }
        },
        { '$unwind': { path: '$doctor' } },
        { '$project': {
            'name': 1,
            'rrhh': { email: 1 },
            'doctor': { email: 1}
        }},
      ]).toArray();
      return company;

      /* let company = await collection.find({
        _id: new ObjectID(id),
      }, { }).toArray();
      return company; */
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async findRrhhEmail(id: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('users');
      let email = await collection.findOne({
        company: new ObjectID(id),
      }, { 
        projection: {
          email: 1,
        },
      });
      return email.email;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async findDoctorEmail(): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('users');
      let email = await collection.findOne({
        type: 1,
      }, { 
        projection: {
          email: 1,
        },
      });
      return email.email;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async findLastSheet(dni: any, today: any, dateIni: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('sheets');
      let id = await collection.find({
        dni: dni,
        date: { $gte: dateIni, $lt: today},
      }, {
        projection: {
          _id: 1,
        },
      }).toArray();
      return id;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async createSymptomatology(data: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('sheets');

      data.company = new ObjectID(data.company);

      let newSheet = await collection.insertOne(data);
      return newSheet.ops[0];
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

}
