/*  --------------------------------------------------
 *
 *  This section initialize Nodemailer config
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
 *  This file only import dependencies and keys
 *
 *  1. Nodemailer dependencies
 *  2. Keys for nodemailer variables
 *
 *  Functions: 
 *
 *  1. Start nodemailer service
 *
 */

import { sendinBlue, emailClient } from '../config/key';
import * as nodemailer from 'nodemailer';


let transporter = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: sendinBlue.user,
    pass: sendinBlue.password,
  },
});

export async function mailerService(to: string, subject: string, text:string, from?: string, ):Promise<any> 
{
  try {
    const mailOptions = {
      from: from || emailClient,
      to: to,
      subject: subject,
      text: text
    };

    await transporter.sendMail(mailOptions)

    return `El correo fue enviado ${to}`;

  } catch (error) {
    console.log(error)
    throw "Error en el servicio de mensajeria, intentelo más tarde.";
  }
}
