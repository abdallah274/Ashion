import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Authentication } from '../core/authentication';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register implements OnInit{
  private readonly _Authentication = inject(Authentication);
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

   errMessage:string='';
   sucMessage:string='';

registerForm: FormGroup= this._FormBuilder.group({
  name:[null , [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
  email:[null , [Validators.required, Validators.email]],
  password:[null,[Validators.required , Validators.pattern(/^\w{6,}$/)] ],
  rePassword:[null],
  phone:[null , [Validators.required, Validators.pattern(/^01[0123][0-9]{8}$/)]]
},{validators:this.confirmPassword})

confirmPassword(g:AbstractControl){
  if(g.get('password')?.value === g.get('rePassword')?.value){
return null;
  } else {
    return {mismatch:true}
  }
}

registerSubmit():void {
   if(this.registerForm.valid){
this._Authentication.sendRegisterData(this.registerForm.value).subscribe({
  next:(res:any)=>{
    const token = res.token;
    this.sucMessage = res.message
    this._Router.navigate(['/login'])  
       localStorage.setItem('userToken' , token)
      console.log(res);
      

  }, error:(err)=>{
  this.errMessage =err.error.message;
  }
})
   }
}

ngOnInit() {
  this.registerForm.get('email')?.valueChanges.subscribe(() => {
    this.errMessage = '';
  });
}

}
