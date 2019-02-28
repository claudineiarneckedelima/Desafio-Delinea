import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { CandidateDetailComponent } from './pages/candidate-detail/candidate-detail.component';
import { CurriculumComponent } from './pages/curriculum/curriculum.component';
import { CurriculumPrintComponent } from './pages/curriculum-print/curriculum-print.component';




const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'candidate', component: CandidateListComponent, canActivate:[AuthGuard] },
  { path: 'candidate/:id', component: CandidateDetailComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'curriculum', component: CurriculumComponent },
  { path: 'curriculum-print', component: CurriculumPrintComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
