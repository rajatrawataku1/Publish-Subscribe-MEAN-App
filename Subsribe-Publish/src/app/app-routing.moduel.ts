import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


const routes: Routes = [
      {
          path: 'Subscribe',
          component: DashboardComponent
      },
      {
          path: '',
          component: NavBarComponent
      }
];


@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule {}
export const routingComponents=[DashboardComponent,NavBarComponent]
