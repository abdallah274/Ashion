import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Authentication } from '../core/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  private readonly _Router = inject(Router)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Authentication = inject(Authentication)
step:number = 1;


verifyemail:FormGroup = this._FormBuilder.group({
  email:[null , [Validators.required, Validators.email]],
})

verifyResetCode: FormGroup = this._FormBuilder.group({
  resetCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
});

resetPassword: FormGroup = this._FormBuilder.group({
email:[null , [Validators.required, Validators.email]],
newPassword:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)] ],});

verifyEmail():void {
// let emailValue = this.verifyemail.get('email')?.value;

this.resetPassword.get('email')?.patchValue(this.verifyemail.get('email')?.value);

  this._Authentication.forgotPassword( this.verifyemail.value  ).subscribe({
    next:(res)=>{

      if(res.statusMsg == 'success'){
       this.step =2;
      }
    
      
    }, error:(err)=> {
      console.log(err);
      
    }
  })
}

setRestCode():void {
  this._Authentication.getResetCode( this.verifyResetCode.value ).subscribe({
    next:(res)=>{

  if(res.status == 'Success') {
    this.step=3;
}  
    }, error:(err)=>{
      console.log(err);
      
    }
  })
}

setRestPassword():void {
   this._Authentication.resetPassword( this.resetPassword.value ).subscribe({
    next:(res)=>{
      console.log(res);
      localStorage.setItem('userToken' , res.token);
      this._Authentication.saveUserData();
      this._Router.navigate(['/home'])

      
    }, error:(err)=>{
      console.log(err);
      
    }
  })
}


// setRestPassword():void {
// this._Authentication.resetPassword(this.verifyemail.value).subscribe({
//   next:(res)=>{
// console.log(res);
// localStorage.setItem('userToken' , res.token)
// this._Router.navigate(['/home'])

//   }, error:(err)=>{
//     console.log(err);
    
//   }
// })
// }







}
