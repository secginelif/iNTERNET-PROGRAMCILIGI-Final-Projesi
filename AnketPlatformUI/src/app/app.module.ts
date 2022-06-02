import { LoginComponent } from './components/login/login.component';
import { KulsecDialogComponent } from './components/dialogs/kulsec-dialog/kulsec-dialog.component';
import { KullisteleComponent } from './components/kullistele/kullistele.component';
import { AnketDialogComponent } from './components/dialogs/anket-dialog/anket-dialog.component';
import { FotoyukleDialogComponent } from './components/dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { AnketlisteleComponent } from './components/anketlistele/anketlistele.component';
import { KullaniciDialogComponent } from './components/dialogs/kullanici-dialog/kullanici-dialog.component';
import { ApiService } from './services/api.service';
import { AnketComponent } from './components/anket/anket.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { AppAlertService } from './services/appAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { KullaniciComponent } from './components/kullanici/kullanici.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MainNavComponent,
    AnketComponent,
    KullaniciComponent,
    AnketlisteleComponent,
    KullisteleComponent,
    
    //Dialogs
    AlertDialogComponent,
    ConfirmDialogComponent,
    KullaniciDialogComponent,
    FotoyukleDialogComponent,
    AnketDialogComponent,
    KulsecDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    KullaniciDialogComponent,
    FotoyukleDialogComponent,
    AnketDialogComponent,
    KulsecDialogComponent
  ],
  providers: [AppAlertService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
