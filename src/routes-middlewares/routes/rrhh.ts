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
import { deleteSheet, getPositiveSheets } from 'services/Rrhh/UseCase/symptomatology'
import { isLogged, isRRHH } from '@Routes/middlewares/routeAccess'


export default (app: Router) => {
  app
    .route('/rrhh/panel')
    .get(isRRHH, async (req: any, res: Response): Promise<void> => {
      try {
        const sheets = await getPositiveSheets(req.user.company);
        res.render('rrhh/panel/panel', {sheets: sheets})
      } catch (error) {
        return managmentError(error, req, res);
      }
    })
  
  app
    .route('/rrhh/eliminar-ficha/:id')
    .delete(isRRHH, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params

        const sheetRemoved = await deleteSheet(id);
        
        res.send(sheetRemoved);
      } catch (error) {
        return managmentError(error, req, res);
      }
    })

}
