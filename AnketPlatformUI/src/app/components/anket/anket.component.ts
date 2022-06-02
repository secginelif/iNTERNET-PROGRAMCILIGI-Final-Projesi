import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { AnketDialogComponent } from './../dialogs/anket-dialog/anket-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { AppAlertService } from './../../services/appAlert.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Anket } from 'src/app/models/Anket';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-anket', 
  templateUrl: './anket.component.html',
  styleUrls: ['./anket.component.css']
})
export class AnketComponent implements OnInit {
  anketler:Anket[] | any;
  dataSource:any;
  displayedColumns=['anketKodu','anketAdi','anketKatId','anketSoruSayisi','detay'];
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator | undefined;
  dialogRef:MatDialogRef<AnketDialogComponent>  | undefined;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent> | undefined;
  constructor(
    public apiServis:ApiService,
    public alert:AppAlertService,
    public matDialog:MatDialog
  ) { }

  ngOnInit() {
    this.AnketListele();
  }


  AnketListele(){
    this.apiServis.AnketListe().subscribe((d:Anket[])=>{
      this.anketler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource. paginator=this.paginator;
    });
  }

  Filtrele(e : any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  Ekle(){
    var yeniKayit:Anket = new Anket();
    this.dialogRef=this.matDialog.open(AnketDialogComponent, {
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });

    this.dialogRef.afterClosed().subscribe(a=>{
      if(a){
        this.apiServis.AnketEkle(a).subscribe((s:Sonuc |any)=>{
          this.alert.AlertUygula(a);
            if(s.islem){
              this.AnketListele();
            }
        });
      }
    });
  }

  Duzenle(kayit:Anket){
    this.dialogRef=this.matDialog.open(AnketDialogComponent, {
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(a=>{
      if(a){
        a.anketId=kayit.anketId;
        this.apiServis.AnketDuzenle(a).subscribe((s:Sonuc |any)=>{
          this.alert.AlertUygula(a);
            if(s.islem){
              this.AnketListele();
            }
        });
      }
    });
  }

  Sil(kayit:Anket){
    this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'500px'
    } );
    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.anketAdi + "anketi silinecektir Onaylıyor musunuz? ";
    this.confirmDialogRef.afterClosed().subscribe(d=>{
      if(d){
        this.apiServis.AnketSil(kayit.anketId).subscribe((s:Sonuc | any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.AnketListele();
          }
        });
      }
    });
  }
}
