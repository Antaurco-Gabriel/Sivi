/*  --------------------------------------------------
 *
 *  This section initialize Cloudinary config
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
 *  1. Cloudinary dependencies
 *  2. Keys for cloudinary variables
 *
 *  Functions: 
 *
 *  1. Start cloudinary service
 *
 */

import { cloudinarykeys } from '@Keys';
import cloudinary from 'cloudinary';
// const cloudinary = require('cloudinary').v2


const cloudinaryService = cloudinary.v2;

cloudinaryService.config({
  cloud_name: cloudinarykeys.CLOUDINARY_CLOUD_NAME,
  api_key: cloudinarykeys.CLOUDINARY_API_KEY,
  api_secret: cloudinarykeys.CLOUDINARY_API_SECRET
})

export default cloudinary;
