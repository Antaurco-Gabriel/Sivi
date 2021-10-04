import { Router, Response, Request } from 'express'
import { managmentError } from '@Loaders/error'
import { isAdmin } from '@Routes/middlewares/routeAccess'
import { createCompany, deleteCompany, deleteUser, sendClients, sendCompanies, sendCompany, sendUser, updatePermitsUser } from '@Admin/UseCase/users-module'

export default (app: Router) => {

  // MODULO USUARIOS - LISTA DE EMPRESAS
  app
    .route('/admin/modulo-usuarios')
    .get(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        const companies = await sendCompanies();
        res.render('users-module/admin/companies-list/companies-list', {companies})
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })
  
  // MODULO USUARIOS - LISTA DE USUARIOS
  app
    .route('/admin/modulo-usuarios/lista-usuarios/:id')
    .get(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params
        const users = await sendClients(id);
        res.render('users-module/admin/users-list/users-list', {users: users[0], id})
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })

  // MODULO USUARIOS - REGISTRAR EMPRESA
  app
    .route('/admin/modulo-usuarios/registrar-empresa')
    .get(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        // const {id} = req.params
        // const company = await sendCompany(id)
        res.render('users-module/admin/companies-register/companies-register')
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })
    .post(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        const data = req.body
        
        const company = await createCompany(data)

        req.session['message'] = {
          type: 'success',
          text: `Empresa ${company.name} registrada correctamente`,
        }
        res.redirect('/admin/modulo-usuarios/')
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })
  
  // MODULO USUARIOS - ELIMINAR EMPRESA
  app
    .route('/admin/modulo-usuarios/eliminar-empresa/:id')
    .get(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params

        const companyDeleted = await deleteCompany(id)
        req.session['message'] = {
          type: 'success',
          text: 'Empresa eliminada correctamente',
        }
        res.redirect('back');
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })
  
  // MODULO USUARIOS - EDITAR PERMISOS DE USUARIO
  app
    .route('/admin/modulo-usuarios/editar-permisos/:id')
    .get(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params
        const userData = await sendUser(id);
        userData.company = await sendCompany(userData.company)
        res.render('users-module/admin/users-roles/users-roles', {userData})
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })
    .post(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params
        const data = req.body
        const idCompany = data.company

        const userUpdate = await updatePermitsUser(id, data)

        req.session['message'] = {
          type: 'success',
          text: 'Permisos de usuario editados correctamente',
        }
        res.redirect('/admin/modulo-usuarios/lista-usuarios/' + idCompany)
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })
  
  // MODULO USUARIOS - ELIMINAR USUARIO
  app
    .route('/admin/modulo-usuarios/eliminar-usuario/:id')
    .get(isAdmin, async (req: any, res: Response): Promise<void> => {
      try {
        const {id} = req.params

        const userDeleted = await deleteUser(id)
        req.session['message'] = {
          type: 'success',
          text: 'Usuario eliminado correctamente',
        }
        res.redirect('back');
      } catch (error:any) {
        return managmentError(error, req, res);
      }
    })

}