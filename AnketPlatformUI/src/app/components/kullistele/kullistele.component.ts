import { KulsecDialogComponent } from './../dialogs/kulsec-dialog/kulsec-dialog.component';
import { AppAlertService } from './../../services/appAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { Kayit } from './../../models/Kayit';
import { Anket } from './../../models/Anket';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kullanici } from 'src/app/models/Kullanici';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-kullistele',
  templateUrl: './kullistele.component.html',
  styleUrls: ['./kullistele.component.css']
})
export class KullisteleComponent implements OnInit {
anketId:string | any;
secAnket:Anket | any;
kayitlar:Kayit[]  | any;
  displayedColumns = ['kulFoto','kulNo','kulAdsoyad','kulTarih','kulAnketSayisi','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator | undefined;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent> | undefined;
  dialogRef: MatDialogRef<KulsecDialogComponent> | undefined;
  constructor(
    public apiServis:ApiService,
    public route:ActivatedRoute,
    public matDialog:MatDialog,
    public alert:AppAlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      this.anketId=p['anketId'];
      this.AnketById();
      this.KayitListele();
    });
  }

  AnketById(){
    this.apiServis.AnketById(this.anketId).subscribe((a:Anket | any)=>{
      this.secAnket = a;
    })
  }

  KayitListele() {
    this.apiServis.AnketKullaniciListe(this.anketId).subscribe((k:Kullanici[] |any ) =>  {
      this.kayitlar=k;
      this.dataSource = new MatTableDataSource(this.kayitlar);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
  }); 
  }

  Ekle(){
    this.dialogRef=this.matDialog.open(KulsecDialogComponent,{
      width:'700px',
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if(d){
        var kayit:Kayit = new Kayit();
        kayit.kayitKulId=d.kulIId;
        kayit.kayitAnketId=this.anketId;

        this.apiServis.KayitEkle(kayit).subscribe((s:Sonuc | any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KayitListele();
          }
        });
      }
    });
  }

  Sil(kayit:Kayit){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent, {
      width:'500px'
    });
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.kulBilgi.kulAdsoyad+"adlı kullanıcı anketten silinecektir";
    this.confirmDialogRef.afterClosed().subscribe(a=>{
      if(a){
        this.apiServis.KayitSil(kayit.kayitId).subscribe((s:Sonuc |any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KayitListele();
          }
        });
      }
    });
  }

}
