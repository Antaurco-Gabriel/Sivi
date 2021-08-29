import { repository } from '../Domain/repository'

export async function createMedicalFollowUp(data: any): Promise<any> {
  try{  
    // const today = new Date();
    // today.setHours(today.getHours() - 5);
    // data.date = today;

    data.dateSymptoms = new Date(data.dateSymptoms);
    data.dateSymptoms.setHours(data.dateSymptoms.getHours() + 12);
    data.dateQuarantine = new Date(data.dateQuarantine);
    data.dateQuarantine.setHours(data.dateQuarantine.getHours() + 12);
    data.dateNextFollowUp = new Date(data.dateNextFollowUp);
    data.dateNextFollowUp.setHours(data.dateNextFollowUp.getHours() + 12);
  
    const result = await repository.createMedicalFollowUp(data);    

    return result;
  }catch(error){
    throw error;
  }
}

export async function updateMedicalFollowUp(data: any): Promise<any> {
  try{  
    // const today = new Date();
    // today.setHours(today.getHours() - 5);
    // data.date = today;

    data.dateSymptoms = new Date(data.dateSymptoms);
    data.dateSymptoms.setHours(data.dateSymptoms.getHours() + 12);
    data.dateQuarantine = new Date(data.dateQuarantine);
    data.dateQuarantine.setHours(data.dateQuarantine.getHours() + 12);
    data.dateNextFollowUp = new Date(data.dateNextFollowUp);
    data.dateNextFollowUp.setHours(data.dateNextFollowUp.getHours() + 12);
  
    const result = await repository.updateMedicalFollowUp(data);    

    return result;
  }catch(error){
    throw error;
  }
}

export async function updateSheet(id: any, preDiagnosis:any, treatment: any, quarantinePeriod:any, dateNextFollowUp: any): Promise<any> {
  try{  

    dateNextFollowUp = new Date(dateNextFollowUp);
    const result = await repository.updateSheet(id, preDiagnosis, treatment, quarantinePeriod, dateNextFollowUp);    

    return result;
  }catch(error){
    throw error;
  }
}
