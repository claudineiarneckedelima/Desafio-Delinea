import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { ChildGuard } from './guards/child.guard';

import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CandidateDetailComponent } from './pages/candidate-detail/candidate-detail.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { CurriculumPrintComponent } from './pages/curriculum-print/curriculum-print.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CandidateListComponent,
    LogoutComponent,
    CandidateDetailComponent,
    CurriculumComponent,
    CurriculumPrintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    ChildGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
