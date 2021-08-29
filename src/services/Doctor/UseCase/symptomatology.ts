import { mailerService } from '@Loaders/nodeMailer';
import { repository } from '../Domain/repository'

export async function getAllPositiveSheets(): Promise<any> {
  try{
    const sheets = await repository.findAllPositiveSheets();
    
    return sheets;
  }catch(error){
    throw error;
  }
}

export async function getSheet(id: any): Promise<any> {
  try{
    const sheet = await repository.findSheet(id);
    
    return sheet[0];
  }catch(error){
    throw error;
  }
}

export async function getMedicalFollowUps(id: any): Promise<any> {
  try{
    const medicalFollowUps = await repository.findMedicalFollowUps(id);
    
    return medicalFollowUps;
  }catch(error){
    throw error;
  }
}

export async function getMedicalFollowUp(id: any): Promise<any> {
  try{
    const medicalFollowUp = await repository.findMedicalFollowUp(id);
    
    return medicalFollowUp[0];
  }catch(error){
    throw error;
  }
}