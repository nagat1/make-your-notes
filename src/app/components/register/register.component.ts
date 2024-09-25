import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,  RouterLink } from '@angular/router';
import { AuthService } from '../../core/sevices/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  msgsuccess:boolean=false;
errormsg='';
  private _formbuilder=inject(FormBuilder)
  private _authservice=inject(AuthService)
 private  _router=inject(Router)
registerform:FormGroup=this._formbuilder.group({
  
  name:[null,[Validators.required,Validators.minLength(3),Validators.pattern(/^\w{3,}$/)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{4,}$/)]],
  age:[null,[Validators.required,Validators.min(20)]],
  phone:[null,[Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]]
  

})
submit(){
  if(this.registerform.valid){

  console.log(this.registerform)
  this._authservice.signup(this.registerform.value).subscribe({
    next:(res)=>{console.log(res);
      
        
        if(res.msg=='done'){
          this.msgsuccess=true
       setTimeout(() => {
        
         
       this._router.navigate(['/login'])
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
