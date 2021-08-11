import { Router, Response, Request } from 'express'
import { managmentError } from '@Loaders/error'

import { createSymptomatology, getAllCompanies, getCompany, getDoctorEmail, getRrhhEmail, isCheckedToday, isPositive, sendMails } from '../../services/Employee/UseCase/symptomatology'

export default (app: Router) => {
  app
    .route('/sintomatologia')
    .get(async (_req: Request, res: Response): Promise<void> => {
      try {
        const data = await getAllCompanies()
        res.render('employee/symptomatology/symptomatology', {symptomatology: data})
      } catch (error) {
        return managmentError(error, _req, res);
      }
    })
    .post(async (req: Request, res: Response): Promise<void> => {
      try {
        const data = req.body;

        const isChecked = await isCheckedToday(data)

        if(!isChecked){
          const sheetSymp =  await createSymptomatology(data);
          const diagnosis = isPositive(sheetSymp);
          
          if (diagnosis) {
            const companyData = await getCompany(data.company);
            const emailRrhh = await getRrhhEmail(data.company);
            const emailDoctor = await getDoctorEmail();

            await sendMails(emailRrhh, emailDoctor, sheetSymp, companyData[0]);

            req.session['message'] = {
              type: 'warning',
              text: 'Su diagnostico fue registrado y enviado al Médico Sivi y a RRHH',
            }
          } else {
            req.session['message'] = {
              type: 'success',
              text: 'Su diagnostico fue registrado correctamente',
            }
          }
        } else {
          req.session['message'] = {
            type: 'error',
            text: 'Usted ya registró un diagnóstico el día de hoy',
          }
        }
        
        return res.redirect('/')

      } catch (error) {
        managmentError(error, req, res);
      }
    })
}
