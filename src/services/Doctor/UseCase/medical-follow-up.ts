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

export async function updateSheet(id: any, data: any): Promise<any> {
  try{  

    data.dateNextFollowUp = new Date(data.dateNextFollowUp);
    const today:any = new Date();
    // const registerDate:any = new Date(data.registerDate);
    const quarantinePeriodRest = parseInt(data.quarantinePeriod) - Math.floor((today - data.dateQuarantine) / (1000 * 3600 * 24));
    // console.log(data.dateQuarantine, registerDate, Math.floor((registerDate - data.dateQuarantine) / (1000 * 3600 * 24)), parseInt(data.quarantinePeriod))


    const result = await repository.updateSheet(id, data.preDiagnosis, data.treatment, data.quarantinePeriod, data.dateNextFollowUp, data.dateQuarantine);    

    return result;
  }catch(error){
    throw error;
  }
}
