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

import { res, req } from '@Loaders/express'

type ErrorData = {
  message: string
  status: number
  redirect?: string
}

export const managmentError = (error: string, req: req, res: res): void => {
  let dataError: ErrorData = JSON.parse(error)

  console.log(`
      ==================π====================
		`)
  console.log(`
      ########################################
      β  π©π©π©     Hubo un throw    π©π©π©  β
      ########################################
		`)

  console.log(`     Ruta del throw: ${req.path}`)
  console.log(`     Metodo de la ruta: ${req.method}`)
  console.log(`     Typo de throw: ${dataError.status}`)
  console.log(`     Mensaje: ${dataError.message}`)
  console.log(`     RedirecciΓ³n: ${dataError.redirect || 'back'}`)

  req.session['message'] = {
    type: 'error',
    text: dataError.message,
  }
  res.redirect(dataError.redirect || 'back')
}

export const managmentApiError = (error: string, req: req, res: res): res => {
  let dataError: ErrorData = JSON.parse(error)

  console.log(`
      ==================π====================
		`)
  console.log(`
      ########################################
      β  π©π©  Hubo un throw en tu api π©π©  β
      ########################################
		`)

  console.log(`     Ruta del throw: ${req.path}`)
  console.log(`     Metodo de la ruta: ${req.method}`)
  console.log(`     Typo de throw: ${dataError.status}`)
  console.log(`     Mensaje: ${dataError.message}`)

  return res.status(dataError.status).send({ error: dataError.message })
}
