import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/sevices/auth.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  msgsuccess:boolean=false;
errormsg='';
  private _formbuilder=inject(FormBuilder)
  private _authservice=inject(AuthService)
 private  _router=inject(Router)
loginform:FormGroup=this._formbuilder.group({

  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{4,}$/)]],

  

})
submit(){
  if(this.loginform.valid){

  console.log(this.loginform)
  this._authservice.signin(this.loginform.value).subscribe({
    next:(res)=>{console.log(res);
      
        
        if(res.msg=='done'){
          this.msgsuccess=true
       setTimeout(() => {
        localStorage.setItem("usertoken",res.token)
         this._authservice.savedata();
       this._router.navigate(['/home'])
       }, 1500);
       
      }
      
  },
    error:(err)=>{console.log(err)
      this.errormsg=err.error.msg
    }
  })
}

}

}
