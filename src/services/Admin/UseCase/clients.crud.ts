import { repository } from '../Domain/repository'

export async function sendClients(): Promise<any> {
  try {
    const where = {}

    const select = {
      name: 1,
      email: 1,
      type: 1,
      _id: 0,
    }

    const order = {
      name: 1,
    }

    const data = await repository.findAllClients(where, select, order)

    return data
  } catch (error) {
    throw error
  }
}

export async function putCaseExample(id: string, data: any): Promise<string> {
  try {
    const update = {
      data1: data.aux,
      data2: data.aux2,
    }

    await repository.updateOne(id, update)

    return 'Se hizo el cambio'
  } catch (error) {
    throw error
  }
}

export async function deleteCaseExample(email: string): Promise<string> {
  try {
    console.log(email)
    // const exits = await repository.findAll(email)
    // if (!exits) throw 'El correo ingresado no esta registrado en la plataforma.'

    return 'Se elimino'
  } catch (error) {
    throw error
  }
}
