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
import { managmentApiError } from '@Loaders/error'

import {
  sendCaseExample,
  putCaseExample,
  deleteCaseExample,
} from '@Example/UseCase/example'

export default (app: router): void => {
  app
    .route('/api/example')
    .get(async (req: req, res: res): Promise<res> => {
      try {
        const data = await sendCaseExample()
        return res.send(data)
      } catch (error) {
        return managmentApiError(error, req, res)
      }
    })

    .put(async (req: req, res: res): Promise<res> => {
      try {
        const { id, data } = req.body
        const response = await putCaseExample(id, data)
        return res.send(response)
      } catch (error) {
        return managmentApiError(error, req, res)
      }
    })

    .delete(async (req: req, res: res): Promise<res> => {
      try {
        const { variable } = req.body
        const data = await deleteCaseExample(variable)
        return res.send(data)
      } catch (error) {
        return managmentApiError(error, req, res)
      }
    })
}
