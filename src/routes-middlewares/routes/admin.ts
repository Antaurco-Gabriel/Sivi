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

import { sendCaseExample } from '@Example/UseCase/example'

export default (app: Router) => {
  app
    .route('/admin-route')
    .get((_req: Request, res: Response) => res.render('admin/panel/example'))

  app
    .route('/example-form')
    .get(async (_req: Request, res: Response) => {
      // const { _id } = req.body;
      const data = await sendCaseExample()
      return res.render('admin/data-form', { data })
    })
    .post(async (req: Request, res: Response) => {
      try {
        // const { email } = req.body;
        const users = await sendCaseExample()
        return res.redirect(users)
      } catch (error) {
        managmentError(error, req, res)
      }
    })
}
