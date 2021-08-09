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
import { router, res, req } from '@Loaders/express'
import { managmentError } from '@Loaders/error'

import { isLogged } from '@Middlewares/routeAccess'

import login from '@Access/UseCase/login'
import registerUser from '@Access/UseCase/register'

export default (app: router) => {
  app
    .route('/ingresar')
    .get(isLogged, (_req: req, res: res): void => res.render('access/login/login'))
    .post(isLogged, async (req: req, res: res): Promise<void> => {
      try {
        const { email, pswd } = req.body

        const user = await login(email, pswd)

        const USERS_ROUTES: Object = {
          0: '/rrhh-route',
          1: '/medico-route',
        }

        const DEFAULT_ROUTE: string = '/'

        const route: string = USERS_ROUTES[user.type] || DEFAULT_ROUTE

        if (route === '') {
          throw JSON.stringify({
            message: 'Ruta no encontrada',
            status: 404,
            redirect: '/',
          })
        }

        /* req.session['message'] = {
          type: 'success',
          text: 'Bienvenido',
        }
        return res.redirect(route) */

        return req.logIn(user, function (err: any) {
          if (err)
            throw JSON.stringify({
              message: 'Ha ocurrido un error interno al iniciar su sesión, intenlo más tarde.',
              status: 404,
              redirect: '/',
            })
          req.session['message'] = {
            type: 'success',
            text: 'Bienvenido',
          }
          return res.redirect(route)
        })
      } catch (error) {
        managmentError(error, req, res)
      }
    })

  app
    .route('/registrarme')
    .get(isLogged, (_req: req, res: res) => res.render('access/register/register'))
    .post(isLogged, async (req: req, res: res): Promise<void> => {
      try {
        const { email, pswd } = req.body

        const newUser = await registerUser(email, pswd)

        return req.logIn(newUser, function (err: any) {
          if (err)
            throw 'Ha ocurrido un error interno al registrar la cuenta, intenlo más tarde.'
          req.session['message'] = {
            type: 'success',
            text: 'Bienvenido',
          }
          return res.redirect('/mis-cursos')
        })
      } catch (error) {
        managmentError(error, req, res)
      }
    })

  app.route('/salir').get((req: req, res: res): void => {
    req.session.destroy((err: any) => {
      if (err)
        console.log(
          'Error : Error al destruir la sesión, intente de nuevo en unos minutos.',
          err
        )
      req.user = undefined
      req.logout()
      res.redirect('/ingresar')
    })
  })
}
