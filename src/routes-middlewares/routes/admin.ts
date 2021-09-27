import { Router, Response, Request } from 'express'
import { managmentError } from '@Loaders/error'
import { isAdmin } from '@Routes/middlewares/routeAccess'
import { sendCompanies } from '@Admin/UseCase/clients.crud'

export default (app: Router) => {
  app
    .route('/admin/modulo-usuarios')
    .get(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        const companies = await sendCompanies();
        res.render('users-module/admin/users-list/users-list', {companies})
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })
}