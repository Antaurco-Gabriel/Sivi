/*  --------------------------------------------------
 *
 *  This section starts the proyect
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
 *  This file only import Loaders
 *
 *  1. Database connection
 *  2. Server connection
 *
 *  Functions:
 *
 *  1. Start database conections
 *  1. Start server
 *
 */
import { startServer } from '@Loaders/express'
import { connect } from '@Loaders/mongo'

async function startProyect() {
  try {
    console.clear()
    console.log(`
      ########################################
      ║ 🦙 Starter Framework Beta v0.11.4 🦙 ║
      ########################################`)

    await connect()
    await startServer()
  } catch (error) {
    console.log(error)
  }
}

startProyect()
