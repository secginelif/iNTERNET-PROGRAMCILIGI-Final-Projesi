import { ApiService } from './../../../services/api.service';
import { Kullanici } from './../../../models/Kullanici';
import { KulFoto } from './../../../models/KulFoto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-fotoyukle-dialog',
  templateUrl: './fotoyukle-dialog.component.html',
  styleUrls: ['./fotoyukle-dialog.component.css']
})
export class FotoyukleDialogComponent implements OnInit {
secilenFoto:any;
kulFoto: KulFoto = new KulFoto();
secKullanici: Kullanici | any;
  constructor(
    public fotoDialogRef: MatDialogRef<FotoyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any,
    public apiService: ApiService
  ) { 
    this.secKullanici = this.data;
  }

  ngOnInit() {
  }

  FotoSec(e:any){
    var fotolar=e.target.files;
    var foto = fotolar[0];

    var fr=new FileReader();
    fr.onloadend=()=>{
      this.secilenFoto= fr.result;
      this.kulFoto.fotoData= fr.result?.toString();
      this.kulFoto.fotoUzanti= foto.type;
    };
    fr.readAsDataURL(foto);
  }

  
}
