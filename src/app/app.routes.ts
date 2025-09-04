import { Allorders } from './components/allorders/allorders';
import { Login } from './components/login/login';
import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Home } from './components/home/home';
import { Men } from './components/men/men';
import { NotFound } from './components/not-found/not-found';
import { BlankLayout } from './components/layouts/blank-layout/blank-layout';
import { Women } from './components/women/women';
import { AuthLayout } from './components/layouts/auth-layout/auth-layout';
import { Details } from './components/details/details';
import { ForgotPassword } from './components/forgot-password/forgot-password';
import { Cart } from './components/cart/cart';
import { Orders } from './components/orders/orders';
import { Electronics } from './electronics/electronics';
import { Account } from './components/account/account';


export const routes: Routes = [
{path:'' , component:BlankLayout , children:[
{path:'' , redirectTo:'home' , pathMatch:'full'},
{path:'home' , component:Home},
{path:'womens', component:Women},
{path:'men', component:Men},
{path:'details/:id' , component:Details},
{path:'cart', component:Cart},
{path:'allorders' , component:Allorders},
{path:'orders/:id' , component:Orders},
{path:'Electronics' , component:Electronics}


]},
{path:'', component:AuthLayout, children:[
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'login' , component:Login},
    {path:'register' , component:Register},
    {path:'forgotPassword' , component:ForgotPassword},
    {path:'account' , component:Account}

]},
  { path: '**', component: NotFound }
];
// export const routes: Routes = [
//   {
//     path: '',
//     component: BlankLayout,
//     children: [
//       { path: '', redirectTo: 'home', pathMatch: 'full' },
//       { path: 'home', component: Home },
//       { path: 'womens', component: Women },
//       { path: 'men', component: Men },
//       { path: 'details/:id', component: Details },
//       { path: 'cart', component: Cart },
//       { path: 'allorders', component: Allorders },
//       { path: 'orders/:id', component: Orders },
//       { path: 'Electronics', component: Electronics }
//     ]
//   },

//   {
//     path: 'auth',
//     component: AuthLayout,
//     children: [
//       { path: '', redirectTo: 'login', pathMatch: 'full' },
//       { path: 'login', component: Login },
//       { path: 'register', component: Register },
//       { path: 'forgotPassword', component: ForgotPassword },
//       { path: 'account', component: Account }
//     ]
//   },

//   { path: '**', component: NotFound }
// ];
