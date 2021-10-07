import { mailerService } from '@Loaders/nodeMailer';
import { repository } from '../Domain/repository'

export async function getAllCompanies(): Promise<any> {
  try{
    const companies = await repository.findAllCompanies();
    
    return companies;
  }catch(error){
    throw error;
  }
}

export async function getCompany(id: any): Promise<any> {
  try{
    const company = await repository.findCompany(id);

    return company[0];
  }catch(error){
    throw error;
  }
}

export async function getRrhhEmail(id: any): Promise<any> {
  try{
    const email = await repository.findRrhhEmail(id);
    
    return email;
  }catch(error){
    throw error;
  }
}

export async function getDoctorEmail(): Promise<any> {
  try{
    const email = await repository.findDoctorEmail();
    
    return email;
  }catch(error){
    throw error;
  }
}

export async function isCheckedToday(data: any): Promise<any> {
  try{  
    const today = new Date();
    today.setHours(today.getHours() - 5);

    const dateIni = new Date(today.getFullYear(), today.getMonth(), today.getDate(),0,0,0);

    const isCheckedToday = await repository.findLastSheet(data.dni, today, dateIni);

    if (isCheckedToday.length > 0) {
      return true 
    } else {
      return false
    }

  }catch(error){
    throw error;
  }
}


export async function createSymptomatology(data: any): Promise<any> {
  try{  
    const today = new Date();
    today.setHours(today.getHours() - 5);
    data.date = today;

    const result = await repository.createSymptomatology(data);    

    return result;
  }catch(error){
    throw error;
  }
}

export async function sendMails(sheetData: any, companyData: any): Promise<any> {
  try { 
    const subject = 'SIVI - Resultado Ficha Sintomatológica';
    const textRrhh = `Hola,\n\n
            Le informamos que el trabajador con DNI: ${sheetData.dni} ha respondido la ficha sintomatológica con resultados positivos\n
            Favor de hacer seguimiento en el sistema para llevar el monitoreo\n\n
            Cordialmente,\n
            El equipo de SIVI`;
    
    const textDoctor = `Hola,\n\n
            Le informamos que el trabajador con DNI: ${sheetData.dni} de la empresa ${companyData.name}, ha respondido la ficha sintomatológica con resultados positivos\n
            Favor de hacer seguimiento en el sistema para llevar el monitoreo\n\n
            Cordialmente,\n
            El equipo de SIVI`;

    // Send email
    if (companyData.rrhh !== '') {
      await mailerService(companyData.rrhh, subject, textRrhh);
    }
    
    await mailerService(companyData.doctor, subject, textDoctor);

  }catch(error){
    throw error;
  }
}

export function isPositive(data: any) {
  try{

    if (data.fever === '1' || data.cough === '1' || data.expectoration === '1' || data.contactCovid === '1' || data.isMedicated === '1') {
      return true;
    } else {
      return false
    }
    
  }catch(error){
    throw error;
  }
}
