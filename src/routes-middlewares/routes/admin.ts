import { Router, Response, Request } from 'express'
import { managmentError } from '@Loaders/error'
import { isAdmin } from '@Routes/middlewares/routeAccess'

export default (app: Router) => {
  app
    .route('/admin/modulo-usuarios')
    .get(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        // const sheets = await getAllPositiveSheets();
        res.render('users-module/admin/users-list/users-list')
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })
}