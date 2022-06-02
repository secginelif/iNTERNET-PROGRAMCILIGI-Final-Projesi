import {MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Anket } from './../../models/Anket';
import { MatTableDataSource } from '@angular/material/table';
import { Kullanici } from './../../models/Kullanici';
import { Kayit } from './../../models/Kayit';
import { AppAlertService } from './../../services/appAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-anketlistele',
  templateUrl: './anketlistele.component.html',
  styleUrls: ['./anketlistele.component.css']
})
export class AnketlisteleComponent implements OnInit {
  kayitlar:Kayit[] | any;
  anketler:Anket[] |any;
  secKullanici:Kullanici  | any;
  kulId:string |any;
  anketId:string |any = "";
  displayedColumns=['anketKodu','anketAdi','anketSoruSayisi','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator | any;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent> |any;
  constructor(
    public apiServis:ApiService,
    public alert:AppAlertService,
    public route:ActivatedRoute ,
    public matDialog:MatDialog

  ) { }

  ngOnInit() {
    this.route.params.subscribe(p =>{
       if(p){
         this.kulId = p['kulId'];
         this.KullaniciGetir();
         this.KayitListele();
         this.AnketListele();
       }
    });
  }

  KullaniciGetir(){
    this.apiServis.KullaniciById(this.kulId).subscribe((d:Kullanici | any)=>{
      this.secKullanici = d;
    });
  }

  KayitListele(){
    this.apiServis.KullaniciAnketListe(this.kulId).subscribe((d:Kayit[] | any )=>{
      this.kayitlar = d;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  AnketListele(){
    this.apiServis.AnketListe().subscribe((d:Anket[] | any )=>{
      this.anketler = d;
    });
  }

  AnketSec(anketId:string){
    this.anketId = anketId;
  }

  Kaydet() : false | any{
    if(this.anketId == ""){
      var s:Sonuc= new Sonuc();
      s.islem = false;
      s.mesaj="Anket Seçiniz";
      this.alert.AlertUygula(s);

      return false;
    }

     var kayit:Kayit=new Kayit();
     kayit.kayitAnketId=this.anketId;
     kayit.kayitKulId=this.kulId;

     this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc | any)=>{
      this.alert.AlertUygula(s);
      if(s.islem){
        this.KayitListele
      }
     });
  }

  Sil(kayit :Kayit){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width: '400px'
    }); 

    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.anketBilgi.anketAdi + "Anketi Silinecektir";
    this.confirmDialogRef.afterClosed().subscribe((d :any)=>{
      console.log(d);
      if(d){
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc | any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KayitListele();
          }
        });
      }
    });
  }
}


