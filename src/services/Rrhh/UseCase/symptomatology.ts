import { mailerService } from '@Loaders/nodeMailer';
import { repository } from '../Domain/repository'

export async function getPositiveSheets(idCompany: any): Promise<any> {
  try{
    const sheets = await repository.findPositiveSheets(idCompany);
    
    return sheets;
  }catch(error:any){
    throw error;
  }
}

export async function deleteSheet(id: any): Promise<any> {
  try{
    const sheet = await repository.deleteSheet(id);
  
    return sheet;
  }catch(error:any){
    throw error;
  }
}