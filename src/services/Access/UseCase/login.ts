import { repository } from '../Domain/repository'

export default async function (email: string, password: string): Promise<any> {
  try {
    const exits: boolean = await repository.existEmail(email)
    if (!exits) {
      throw JSON.stringify({
        message: 'El correo ingresado no esta registrado en la plataforma',
        status: 400,
        redirect: '/',
      })
    }

    let passwordEncrypt = repository.encryptPassword(password)

    const user = await repository.findUser({ email: email, password: passwordEncrypt })
    if (!user) {
      throw JSON.stringify({
        message: 'Contraseña equivocada',
        status: 400,
        redirect: '/ingresar',
      })
    }

    return user
  } catch (error) {
    throw error
  }
}
