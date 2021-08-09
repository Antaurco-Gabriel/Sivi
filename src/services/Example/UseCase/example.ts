import { repository } from '../Domain/repository'

export async function sendCaseExample(): Promise<any> {
  try {
    const where = {}

    const select = {
      name: 1,
      type: 1,
    }

    const order = {
      type: -1,
      name: 0,
    }

    const data = await repository.findAll(where, select, order)

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
    const exits = await repository.findAll(email)
    if (!exits) throw 'El correo ingresado no esta registrado en la plataforma.'

    return 'Se elimino'
  } catch (error) {
    throw error
  }
}
