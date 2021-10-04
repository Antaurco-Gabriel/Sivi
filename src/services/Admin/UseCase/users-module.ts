import { repository } from '../Domain/repository'

export async function sendClients(id: any): Promise<any> {
  try {

    let data = await repository.findCompanyUsers(id)
    data[0].users = data[0].users.filter((user:any) => {
      return user.status === 0
    })

    return data
  } catch (error) {
    throw error
  }

}

export async function sendUser(id: any): Promise<any> {
  try {

    const data = await repository.findById(id)

    return data
  } catch (error) {
    throw error
  }

}

export async function sendCompanies(): Promise<any> {
  try {
    const where = {
      status: 0,
    }

    const select = {
      name: 1,
      ruc: 1,
      _id: 1,
    }

    const order = {
      name: 1,
    }

    const data = await repository.findAllCompanies(where, select, order)

    return data
  } catch (error) {
    throw error
  }
}

export async function sendCompany(id:any): Promise<any> {
  try {

    const data = await repository.findCompany(id)

    return data
  } catch (error) {
    throw error
  }
}

export async function updatePermitsUser(id: string, data: any): Promise<string> {
  try {
    let update: any = {}

    if (data.isAdmin === '0') {
      update = {
        permits: {
          isAdmin: parseInt(data.isAdmin),
        }
      }
    } else {
      update = {
        permits: {
          health_module: {
            access: data.health_module_access === '1' ? true : false,
            type: data.health_module_type !== undefined ? parseInt(data.health_module_type) : '',
          },
          surveys_module: {
            access: data.surveys_module_access === '1' ? true : false,
            type: data.surveys_module_type !== undefined ? parseInt(data.surveys_module_type) : ''
          },
          isAdmin: parseInt(data.isAdmin),
        }
      }
    }

    await repository.updateOne(id, update)

    return 'Se hizo el cambio'
  } catch (error) {
    throw error
  }
}

export async function deleteUser(id: string): Promise<string> {
  try {
    
    const update = {
      status: 1,
    }

    await repository.updateOne(id, update)

    return 'Se hizo el cambio'
  } catch (error) {
    throw error
  }
}

export async function deleteCompany(id: string): Promise<string> {
  try {
    
    const update = {
      status: 1,
    }

    await repository.updateCompany(id, update)

    return 'Se hizo el cambio'
  } catch (error) {
    throw error
  }
}

export async function createCompany(data: any): Promise<any> {
  try {

    console.log(data)

    const companyData = {
      name: data.name,
      ruc: data.ruc,
      users: {},
      status: 0,
    }

    let company = await repository.registerCompany(companyData)

    return company
  } catch (error) {
    throw error
  }

}

/* export async function putCaseExample(id: string, data: any): Promise<string> {
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
} */

/* export async function deleteCaseExample(email: string): Promise<string> {
  try {
    console.log(email)
    // const exits = await repository.findAll(email)
    // if (!exits) throw 'El correo ingresado no esta registrado en la plataforma.'

    return 'Se elimino'
  } catch (error) {
    throw error
  }
}
 */