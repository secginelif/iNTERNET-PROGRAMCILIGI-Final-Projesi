import { Kullanici } from './../../../models/Kullanici';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from './../../../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.css']
})
export class KullaniciDialogComponent implements OnInit {
  dialogBaslik: string | any;
  islem : string | any ;
  frm: FormGroup | any;
  yeniKayit: Kullanici | any;

  constructor(
    public MatDialog : MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<KullaniciDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.islem = data.islem;
      this.yeniKayit = data.kayit;
      if(this.islem == 'ekle'){
        this.dialogBaslik="Kullanıcı Ekle"
      }
      if(this.islem == 'duzenle'){
        this.dialogBaslik="Kullanıcı Düzenle"
      }
      this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      kulNo:[this.yeniKayit?.kulNo],
      kulAdsoyad:[this.yeniKayit?.kulAdsoyad],
      kulTarih:[this.yeniKayit?.kulTarih]
    });
  }

}
