/*  --------------------------------------------------
 *
 *  This section starts the route Access
 *
 *  We implements hexagonal arquitecture
 *  Remember, this arquitecture have 4 layers
 *
 *  - API layer
 *  - Infrastructure layer
 *  - UseCase layer
 *  - Domain layer
 *
 *  --------------------------------------------------
 *  Implements Infrastructure layer
 *  --------------------------------------------------
 *
 *
 *  Only connect witch UseCase layer.
 *
 *
 *  This file only import
 *
 *  1. Express response and request.
 *  2. Managment error.
 *  3. External services implementation, example: nodemailer.
 *  4. Middlewares.
 *  5. Use case this service use.
 *
 */

import { Router, Response, Request } from 'express'
import { managmentError } from '@Loaders/error'
import { getAllPositiveSheets, getMedicalFollowUp, getMedicalFollowUps, getSheet } from 'services/Doctor/UseCase/symptomatology';
import { isDoctor, isLogged } from '@Routes/middlewares/routeAccess';
import { createMedicalFollowUp, updateMedicalFollowUp, updateSheet } from 'services/Doctor/UseCase/medical-follow-up';


export default (app: Router) => {
  app
    .route('/medico/panel')
    .get(isDoctor, async (req: any, res: Response): Promise<void> => {
      try {
        const sheets = await getAllPositiveSheets();
        res.render('doctor/panel/panel',{sheets: sheets})
      } catch (error) {
        return managmentError(error, req, res);
      }
    })
  
  app
    .route('/medico/lista-seguimientos/:id')
    .get(isDoctor, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params
        const sheet = await getSheet(id);
        const medicalFollowUps = await getMedicalFollowUps(id);
        res.render('doctor/medical-follow-up/medical-follow-up', {sheet: sheet, medicalFollowUps: medicalFollowUps})
      } catch (error) {
        return managmentError(error, req, res);
      }
    })
  
  app
    .route('/medico/crear-seguimiento/:id')
    .get(isDoctor, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params
        const sheet = await getSheet(id);
        res.render('doctor/create-medical-follow-up/create-medical-follow-up', {sheet: sheet})
      } catch (error) {
        return managmentError(error, req, res);
      }
    })
    .post(isDoctor, async (req: Request, res: Response): Promise<void> => {
      try {
        const {id} = req.params;
        const data = req.body;
        data.idSheet = id;

        const newFollowUp =  await createMedicalFollowUp(data);
        const updatedSheet = await updateSheet(id, data.preDiagnosis, data.treatment, data.quarantinePeriod, data.dateNextFollowUp);
        
        return res.redirect('/medico/lista-seguimientos/' + id)

      } catch (error) {
        managmentError(error, req, res);
      }
    })

  app
    .route('/medico/ver-seguimiento/:id')
    .get(isDoctor, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params
        const medicalFollowUp = await getMedicalFollowUp(id);
        res.render('doctor/view-medical-follow-up/view-medical-follow-up', {sheet: medicalFollowUp.sheet, medicalFollowUp})
      } catch (error) {
        return managmentError(error, req, res);
      }
    })

  app
    .route('/medico/editar-seguimiento/:id')
    .get(isDoctor, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params
        const medicalFollowUp = await getMedicalFollowUp(id);
        res.render('doctor/edit-medical-follow-up/edit-medical-follow-up', {sheet: medicalFollowUp.sheet, medicalFollowUp})
      } catch (error) {
        return managmentError(error, req, res);
      }
    })
    .post(isDoctor, async (req: Request, res: Response): Promise<void> => {
      try {
        const data = req.body;

        const editedFollowUp =  await updateMedicalFollowUp(data);
        const updatedSheet = await updateSheet(data.idSheet, data.preDiagnosis, data.treatment, data.quarantinePeriod, data.dateNextFollowUp);
        
        return res.redirect('/medico/lista-seguimientos/' + data.idSheet)

      } catch (error) {
        managmentError(error, req, res);
      }
    })

}