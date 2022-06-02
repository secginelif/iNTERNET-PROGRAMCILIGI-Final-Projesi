import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Kullanici } from 'src/app/models/Kullanici';
import { ApiService } from 'src/app/services/api.service';
import { AppAlertService } from 'src/app/services/appAlert.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FotoyukleDialogComponent } from '../fotoyukle-dialog/fotoyukle-dialog.component';
import { KullaniciDialogComponent } from '../kullanici-dialog/kullanici-dialog.component';

@Component({
  selector: 'app-kulsec-dialog',
  templateUrl: './kulsec-dialog.component.html',
  styleUrls: ['./kulsec-dialog.component.css']
})
export class KulsecDialogComponent implements OnInit {
  kullanicilar:Kullanici[]  | any;
  displayedColumns = ['kulNo','kulAdsoyad','kulTarih','kulAnketSayisi','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort | any;
  @ViewChild(MatPaginator) paginator:MatPaginator | any;
  confirmDialogRef:MatDialogRef<ConfirmDialogComponent>  |any;
  fotoDialogRef:MatDialogRef<FotoyukleDialogComponent>  | any;

  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:AppAlertService,
    public dialogRef:MatDialogRef<KullaniciDialogComponent> 
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

  KullaniciSec(kul:Kullanici){
    this.dialogRef.close(kul);
  }

}
