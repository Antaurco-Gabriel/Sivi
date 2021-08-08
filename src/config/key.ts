import dotenv from 'dotenv'

const env = dotenv.config({
  path: process.env.NODE_ENV == 'dev' ? '.dev.env' : '.prod.env',
})

if (env.error) throw new Error('Dont find env file')

const getConfigValue = (key: string) => {
  return <string>process.env[key]
}

export const mongodb = {
  MONGO_URI: getConfigValue('MONGO_URI'),
}

export const postgressqldb = {
  USER: getConfigValue('POSTGRESQL_USER'),
  HOST: getConfigValue('POSTGRESQL_HOST'),
  PASSWORD: getConfigValue('POSTGRESQL_PASSWORD'),
  PORT: parseInt(getConfigValue('POSTGRESQL_PORT')),
}

export const cloudinarykeys = {
  CLOUDINARY_CLOUD_NAME: getConfigValue('CLOUDINARY_CLOUD_NAME'),
  CLOUDINARY_API_KEY: getConfigValue('CLOUDINARY_API_KEY'),
  CLOUDINARY_API_SECRET: getConfigValue('CLOUDINARY_API_SECRET'),
}

export const expressKeys = {
  port: parseInt(getConfigValue('PORT')),
  host: parseInt(getConfigValue('HOST')),
  SESSION_SECRET: getConfigValue('SESSION_SECRET'),
  CACHE_SESSION: getConfigValue('CACHE_SESSION'),
}

export const tokenSession = {
  SECRET: getConfigValue('SESSION_SECRET'),
}

export const emailClient = getConfigValue('EMAIL_CLIENT')

export const sendinBlue = {
  user: getConfigValue('SENDINBLUE_USER'),
  password: getConfigValue('SENDINBLUE_PASSWORD'),
}

export const sendGrid = {
  user: getConfigValue('SENDGRID_USER'),
  password: getConfigValue('SENDGRID_PASSWORD'),
}
