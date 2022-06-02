import { KulFoto } from './../../models/KulFoto';
import { FotoyukleDialogComponent } from './../dialogs/fotoyukle-dialog/fotoyukle-dialog.component';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { AppAlertService } from './../../services/appAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { KullaniciDialogComponent } from './../dialogs/kullanici-dialog/kullanici-dialog.component';
import { ApiService } from './../../services/api.service';
import { Kullanici } from './../../models/Kullanici';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-kullanici',
  templateUrl: './kullanici.component.html',
  styleUrls: ['./kullanici.component.css']
})
export class KullaniciComponent implements OnInit {
  kullanicilar:Kullanici[]  | any;
  displayedColumns = ['kulFoto','kulNo','kulAdsoyad','kulTarih','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator | undefined;
  dialogRef:MatDialogRef<KullaniciDialogComponent>  | undefined;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>  | undefined;
  fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>  | undefined;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:AppAlertService
  ) { }

  ngOnInit() {
    this.KullaniciListele();
  }

  KullaniciListele() {
    this.apiServis.KullaniciListe().subscribe((d:Kullanici[] |any ): void  =>  {
      this.kullanicilar=d;
      this.dataSource = new MatTableDataSource(this.kullanicilar);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator = this.paginator;
  }); 
  }

  Filtrele(e : any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  Ekle() {
    var yeniKayit:Kullanici = new Kullanici();
    this.dialogRef=this.matDialog.open(KullaniciDialogComponent, {
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=> {
      if(d){
        this.apiServis.KullaniciEkle(d).subscribe((s:Sonuc |any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KullaniciListele(); 
          }
        });
      }
    });
  }

  Duzenle(kayit:Kullanici) {
    this.dialogRef=this.matDialog.open(KullaniciDialogComponent, {
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
      this.dialogRef.afterClosed().subscribe(d=> {
        if(d){

          kayit.kulNo=d.kulNo;
          kayit.kulAdsoyad=d.kulAdsoyad;
          kayit.kulTarih=d.kulTarih;

          this.apiServis.KullaniciDuzenle(kayit).subscribe((s:Sonuc |any)=>{
            this.alert.AlertUygula(s);
          });
        }

      });
  }

  Sil(kayit:Kullanici){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    } );
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.kulAdsoyad + "kullanıcısı silinecektir Onaylıyor musunuz? ";

    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.KullaniciSil(kayit.kulId).subscribe((s:Sonuc |any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KullaniciListele();
          }
        });
      }
    });
  }

  FotoGuncelle(kayit:Kullanici){
    this.fotoDialogRef=this.matDialog.open(FotoyukleDialogComponent,{
      width:'400px',
      data:kayit
    });
    
    this.fotoDialogRef.afterClosed().subscribe((d:KulFoto)=>{
      if(d){
        d.kulId = kayit.kulId;
        this.apiServis.KulFotoGuncelle(d).subscribe((s:Sonuc |any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KullaniciListele();
          }
        });
      }
    });

  }
}
