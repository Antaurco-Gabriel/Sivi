import { Router, Response, Request } from 'express'
import { managmentError } from '@Loaders/error'

import { sendCaseExample } from '@Example/UseCase/example'

export default (app: Router) => {
  app
    .route('/sintomatologia')
    .get((_req: Request, res: Response) => res.render('employee/symptomatology/symptomatology'))

}
