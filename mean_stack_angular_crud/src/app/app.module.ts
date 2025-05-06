import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http'
// import { RegisterComponent } from './auth/register/register.component';
// import { LoginComponent } from './auth/login/login.component';
// import { StudentComponent } from './student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    // RegisterComponent,
    // LoginComponent,
    // StudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
