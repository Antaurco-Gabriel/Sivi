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
 *  Only connect witch routes and routes-components.
 *
 *
 *  This file only import
 *
 *  1. Express response and request.
 *  2. Routes.
 *  3. Routes-components.
 *
 */

import { router } from '@Loaders/express'

import home from './routes/home'
import access from './routes/access'
import rrhh from './routes/rrhh'
import employee from './routes/employee'
import doctor from './routes/doctor'
import apiExample from './routes-components/api.example'
import apiAdmin from './routes-components/admin.api'

export default () => {
  const app = router()

  home(app)
  access(app)
  rrhh(app)
  apiExample(app)
  apiAdmin(app)
  employee(app)
  doctor(app)

  return app
}
