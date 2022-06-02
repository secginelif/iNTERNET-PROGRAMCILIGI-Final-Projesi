import { Anket } from './../../../models/Anket';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-anket-dialog',
  templateUrl: './anket-dialog.component.html',
  styleUrls: ['./anket-dialog.component.css']
})
export class AnketDialogComponent implements OnInit {
  dialogBaslik: string | any;
  islem : string | any ;
  frm: FormGroup | any;
  yeniKayit: Anket | any;

  constructor(
    public MatDialog : MatDialog,
    public frmBuild: FormBuilder,
    public dialogRef: MatDialogRef<AnketDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.islem = data.islem;
      this.yeniKayit = data.kayit;
      if(this.islem == 'ekle'){
        this.dialogBaslik="Anket Ekle"
      }
      if(this.islem == 'duzenle'){
        this.dialogBaslik="Anket Düzenle"
      }
      this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur(){
    return this.frmBuild.group({
      anketKodu:[this.yeniKayit?.anketKodu],
      anketAdi:[this.yeniKayit?.anketAdi],
      anketKatId:[this.yeniKayit?.anketKatId],
      anketSoruSayisi:[this.yeniKayit?.anketSoruSayisi]
    });
  }

}
