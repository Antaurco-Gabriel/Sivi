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
import { isAdmin, isUser } from '@Routes/middlewares/routeAccess'

export default (app: router) => {
  app.route('/').get((_req: req, res: res) =>
    res.render('home/home/home', {
      cardtitle: 'Sivi Business',
    })
  )

  app.route('/user/panel').get(isUser, (_req: req, res: res) =>
    res.render('home/user-panel/user-panel', {
      cardtitle: 'Sivi Business',
    })
  )

  app.route('/admin/panel').get(isAdmin, (_req: req, res: res) =>
    res.render('home/admin-panel/admin-panel', {
      cardtitle: 'Sivi Business',
    })
  )
}
