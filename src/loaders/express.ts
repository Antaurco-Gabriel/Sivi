/*  --------------------------------------------------
 *
 *  This section instance server with express
 *
 *  We implements hexagonal arquitecture filosofy
 *  in a modular monolith
 *
 *  Remember, this arquitecture have 4 layers
 *
 *  - API layer
 *  - Infrastructure layer
 *  - UseCase layer
 *  - Domain layer
 *
 *  --------------------------------------------------
 *  Implements API layer
 *  --------------------------------------------------
 *
 *  This file import configurations, keys, loaders and
 *  routes
 *
 *  1. Express, Session, Flash, path and passport
 *     configurations dependencies
 *  2. ExpressKeys is a variable data project
 *  3. StoreMongo and MulterImg is a aditional config
 *     per project
 *  4. Routes define routes whit use in this project
 *
 *  Functions:
 *
 *  1. Set configuration and default paths
 *
 */
import express from 'express'
import session from 'express-session'
import path from 'path'
import passport from './passport'

import { Router, Response, Request, NextFunction, Express } from 'express'

import { expressKeys } from '@Keys'

import { storeMongo } from './mongo'
import multerImg from '@Loaders/multer'

import { liveReloadServer } from '@Loaders/livereload'

import routes from '../routes-middlewares/routes.module'

export async function startServer(): Promise<Express> {
  const app: Express = express()

  const publicDirectory = path.join(__dirname, '../public')
  const viewsDirectory = path.join(__dirname, '../views')

  await liveReloadServer(app, [viewsDirectory, publicDirectory])

  app.get('/status', (_req: Request, res: Response) => {
    res.status(200).end()
  })
  app.head('/status', (_req: Request, res: Response) => {
    res.status(200).end()
  })

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy')

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json())

  // Is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code:
  app.use(express.urlencoded({ extended: true }))

  app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: expressKeys.SESSION_SECRET,
      cookie: { maxAge: 1209600000, sameSite: 'strict' },
      store: storeMongo(session),
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  //set user and flash message in express
  app.use((req: Request, res: Response, next: NextFunction) => {
    app.locals.user = req.user
    res.locals.user = app.locals.user

    res.locals.message = req.session['message']
    delete req.session['message']
    next()
  })

  // Set multer config in express
  app.use(multerImg)

  // Defined default path locations
  app.use('/', routes())
  app.use(
    '/public',
    express.static(publicDirectory, { maxAge: expressKeys.CACHE_SESSION })
  )
  app.use('/views', express.static(viewsDirectory, { maxAge: expressKeys.CACHE_SESSION }))

  app.set('views', viewsDirectory)
  app.set('host', expressKeys.host)
  app.set('port', process.env.PORT || expressKeys.port)
  app.set('view engine', 'pug')

  app
    .listen(app.get('port'), () => {
      console.log(`-------- ${app.get('port')} --------`)
    })
    .on('error', (error: any) => {
      console.log(error)
    })
  return app
}

export const router = () => Router()
export type router = Router
export type res = Response
export type req = Request
export type next = NextFunction
