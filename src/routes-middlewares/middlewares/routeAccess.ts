export function isLogged ( req: any, res:any, next:any){
  
  if( typeof req.user !== 'undefined'){

    let route: string = '';
    switch(req.user.type){
      case 0: 
        route = '/rrhh-route';
        break;
      case 1:
        route = '/medico-route';
        break;
      default:
        route = '/salir';
        break;
    }

    return res.redirect(route);
  }

  return next();
}
