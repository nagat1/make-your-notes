import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {
  const _PLATFORM_ID=inject(PLATFORM_ID)
  const _router=inject(Router)

  if(isPlatformBrowser(_PLATFORM_ID)){
    if(localStorage.getItem('usertoken')!==null){
   
      _router.navigate(['/home'])
      return false;
    }
    else{
       return true;
     }
    }
    else{
      return false;
    }
};
