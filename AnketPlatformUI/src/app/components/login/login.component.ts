import { AppAlertService } from 'src/app/services/appAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public apiServis:ApiService,
    public alert:AppAlertService
  ) { }

  ngOnInit() {
  }

  

}
