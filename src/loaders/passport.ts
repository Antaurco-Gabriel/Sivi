/*  --------------------------------------------------
 *
 *  This section initialize Passport config
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
 *  This file only import dependencies and respository
 *
 *  1. Passport dependencies
 *  2. Access repository
 *
 *  Functions: 
 *
 *  1. Start passport service
 *  2. Save session with in database
 *
 */
import passport from 'passport';
import { repository } from "@Access/Domain/repository";


passport.serializeUser((user: any, done: any) => {
  done(undefined, user);
});

passport.deserializeUser(async(user:any, done: any) => {
  try {
    let newUser:any = {}
    if (user){
      newUser = await repository.findById(user._id);
      user=newUser;
      done(null, user);
    }
  } catch (error) {
    done(error, user);
  }
});

export default passport;
