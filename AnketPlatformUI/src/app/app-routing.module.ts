
import { KullisteleComponent } from './components/kullistele/kullistele.component';
import { AnketlisteleComponent } from './components/anketlistele/anketlistele.component';
import { AnketComponent } from './components/anket/anket.component';
import { KullaniciComponent } from './components/kullanici/kullanici.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'kullanici',
    component:KullaniciComponent
  },
  {
    path:'anket',
    component:AnketComponent
  },
  {
    path:'anketlistele/:kulId',
    component:AnketlisteleComponent
  },
  {
    path:'kullistele/:anketId',
    component:KullisteleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
