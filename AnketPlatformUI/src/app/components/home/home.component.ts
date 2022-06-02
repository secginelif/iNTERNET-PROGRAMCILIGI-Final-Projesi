import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from './../../models/Sonuc';
import { AppAlertService } from './../../services/appAlert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent> | undefined;
  constructor(
    public alert:AppAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  AlertAc(p:boolean){
    var s:Sonuc = new Sonuc();
    s.islem=p;
    s.mesaj="Bu bir test mesajı";

    this.alert.AlertUygula(s);

  }

  ConfirmAc(){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width: '400px'
    }); 

    this.confirmDialogRef.componentInstance.dialogMesaj="Kayıt Silinecektir";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      console.log(d);
      if(d){
        
      }
    });
  }

}
