import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemComponent } from './add-item/add-item.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MerchantMenuComponent } from './merchant-menu/merchant-menu.component';
import { MerchantWelcomeComponent } from './merchant-welcome/merchant-welcome.component';
import { RegisterComponent } from './register/register.component';
import { SuccessComponent } from './success/success.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UsereditComponent } from './useredit/useredit.component';
import { UserService } from './user.service';
import { FeedbackDetailsComponent } from './feedback-details/feedback-details.component';
import {MatIconModule} from '@angular/material/icon';

const routes: Routes = [
  {path:'login',
  component:LoginComponent},
  {path: 'register',
  component:RegisterComponent},
  { path: 'edit-profile', 
  component: EditProfileComponent },
  {path:'welcome',
  component:WelcomeComponent},
  {path:'menu',
  component:MenuComponent},
  {path:'home',
  component:HomeComponent},
  {path:'checkout',
  component:CheckoutComponent},
  {path:'success',
  component:SuccessComponent},
  {path:'merchantWelcome',
  component:MerchantWelcomeComponent},
  {path:'merchantMenu',
  component:MerchantMenuComponent},
  {path:'',
  component:HomeComponent},
  {path:'addItem',
  component:AddItemComponent},
  {path:'contactUs',
  component:ContactUsComponent},
  {path:'useredit',
  component:UsereditComponent},
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  {path:'feedback',
  component:FeedbackDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }

