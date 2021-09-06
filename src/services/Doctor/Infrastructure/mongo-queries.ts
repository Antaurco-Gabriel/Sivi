import { getConection, stringToObjectId, managmentMongoError } from '@Loaders/mongo'
import { ObjectId, ObjectID } from 'mongodb';

export class Mongo {

  public async findAllPositiveSheets(): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('sheets');
      const sheets = await collection.aggregate([
        {
          $match: {isPositive: true}
        },
        {
          '$lookup': {
            'from': 'companies',
            'localField': 'company',
            'foreignField': '_id',
            'as': 'company'
          }
        },
        { '$unwind': { path: '$company' } 
        },
      ]).toArray();

      return sheets;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async findSheet(id: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('sheets');

      const sheet = await collection.aggregate([
        {
          $match: {_id: new ObjectId(id),}
        },
        {
          '$lookup': {
            'from': 'companies',
            'localField': 'company',
            'foreignField': '_id',
            'as': 'company'
          }
        },
        { '$unwind': { path: '$company' } 
        },
      ]).toArray();
      
      return sheet;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async createMedicalFollowUp(data: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('medical-follow-ups');

      data.idSheet= new ObjectID(data.idSheet);

      let newFollowUp = await collection.insertOne(data);
      return newFollowUp.ops[0];
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async updateMedicalFollowUp(data: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('medical-follow-ups');

      let updatedFollowUp = await collection.updateOne(
        { "_id":  new ObjectID(data.idMedicalFollowUp)},
        {
          "$set": {
            registerDate: data.registerDate,
            registerHours: data.registerHours,
            minutes: data.minutes,
            contactCovid: data.contactCovid,
            relationshipCovid: data.relationshipCovid,
            healthHistory: data.healthHistory,
            area: data.area,
            position: data.position,
            contacts: data.contacts,
            symptoms: data.symptoms,
            preDiagnosis: data.preDiagnosis,
            dateSymptoms: data.dateSymptoms,
            comments: data.comments,
            treatment: data.treatment,
            quarantinePeriod: data.quarantinePeriod,
            dateQuarantine: data.dateQuarantine,
            treatmentComments: data.treatmentComments,
            healthForecasts: data.healthForecasts,
            dateNextFollowUp: data.dateNextFollowUp,
            recommendations: data.recommendations,
          }
      })

      return updatedFollowUp;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }


  public async updateSheet(id: any, preDiagnosis:any, treatment: any, quarantinePeriod:any, dateNextFollowUp: any, dateQuarantine: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('sheets');

      let updatedSheet = await collection.updateOne(
        { "_id":  new ObjectID(id)},
        {
          "$set": {
            preDiagnosis: preDiagnosis,
            treatment: treatment,
            quarantinePeriod: quarantinePeriod,
            dateNextFollowUp: dateNextFollowUp,
            dateQuarantine: dateQuarantine,
          }
      })

      return updatedSheet;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async findMedicalFollowUps(id: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('medical-follow-ups');
      const medicalFollowUps = await collection.find({idSheet: new ObjectID(id)}, { 
        projection: {
          _id: 1,
          registerDate: 1, 
          registerHours: 1,
          preDiagnosis: 1,
          treatment: 1,
          quarantinePeriod: 1,
          dateNextFollowUp: 1,
        } 
      } ).toArray();

      return medicalFollowUps;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

  public async findMedicalFollowUp(id: any): Promise<any>{
    try{
      const database = getConection();
      const collection = database.collection('medical-follow-ups');

      const medicalFollowUp = await collection.aggregate([
        {
          $match: {_id: new ObjectId(id),}
        },
        {
          '$lookup': {
            'from': 'sheets',
            'localField': 'idSheet',
            'foreignField': '_id',
            'as': 'sheet'
          }
        },
        { '$unwind': { path: '$sheet' } 
        },
        {
          '$lookup': {
            'from': 'companies',
            'localField': 'sheet.company',
            'foreignField': '_id',
            'as': 'sheet.company'
          }
        },
        { '$unwind': { path: '$sheet.company' } 
        },
      ]).toArray();
      
      return medicalFollowUp;
    }catch(error:any){
      throw managmentMongoError(error);
    }
  }

}

