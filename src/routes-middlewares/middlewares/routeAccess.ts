export function isLogged ( req: any, res:any, next:any){
  
  if( typeof req.user !== 'undefined'){

    let route: string = '';
    switch(req.user.type){
      case 0:
        route = '/admin/panel';
        break;
      case 1:
        route = '/user/panel';
        break;
      default:
        route = '/salir';
        break;
    }

    return res.redirect(route);
  }

  return next();
}

export function isAdmin( req: any, res: any, next: any){
  if(!req.user){
    req.session['message'] = {
      type: 'error',
      text: 'Debe iniciar sesión para poder ver esta información',
    }
    return res.redirect('back');
  }
  
  if(req.user.type == 0) {
    return next();
  }
  
  req.session['message'] = {
    type: 'error',
    text: 'Debe ser admin para poder ver esta información',
  }

  return res.redirect('back');
}

export function isUser( req: any, res: any, next: any){
  if(!req.user){
    req.session['message'] = {
      type: 'error',
      text: 'Debe iniciar sesión para poder ver esta información',
    }
    return res.redirect('back');
  }
  
  if(req.user.type == 1) {
    return next();
  }
  
  req.session['message'] = {
    type: 'error',
    text: 'Debe estar registrado para poder ver esta información',
  }

  return res.redirect('back');
}

export function isRRHH( req: any, res: any, next: any){
  if(!req.user){
    req.session['message'] = {
      type: 'error',
      text: 'Debe iniciar sesión para poder ver esta información',
    }
    return res.redirect('back');
  }
  
  if(req.user.type == 1) {
    if(req.user.permits.health_module && req.user.permits.health_module.access && req.user.permits.health_module.type === 0) {
      return next();
    }
  }

  req.session['message'] = {
    type: 'error',
    text: 'Debe ser un usuario de Recursos Humanos para poder ver esta información',
  }

  return res.redirect('back');
}

export function isDoctor( req: any, res: any, next: any){
  if(!req.user){
    req.session['message'] = {
      type: 'error',
      text: 'Debe iniciar sesión para poder ver esta información',
    }
    return res.redirect('back');
  }
  if(req.user.type == 1){
    if(req.user.permits.health_module && req.user.permits.health_module.access && req.user.permits.health_module.type === 1) {
      return next();
    }
  }

  req.session['message'] = {
    type: 'error',
    text: 'Debe ser un usuario Médico para poder ver esta información',
  }

  return res.redirect('back');
}
