import { KulFoto } from './../models/KulFoto';
import { Kayit } from './../models/Kayit';
import { Sonuc } from './../models/Sonuc';
import { Kullanici } from './../models/Kullanici';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anket } from '../models/Anket';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
apiUrl="http://localhost:49173/api/";
siteUrl= "http://localhost:49173/";
constructor(
  public http:HttpClient
) { }

// Kullanıcı API
KullaniciListe(){
  return this.http.get<Kullanici[]>(this.apiUrl+"kullaniciliste");
}

KullaniciById(kulId:string){
  return this.http.get<Kullanici[]>(this.apiUrl+"kullanicibyid/"+kulId);
}

KullaniciEkle(kul:Kullanici){
  return this.http.post<Sonuc[]>(this.apiUrl+"kullaniciekle",kul);
}
KullaniciDuzenle(kul:Kullanici){
  return this.http.put<Sonuc[]>(this.apiUrl+"kullaniciduzenle",kul);
}

KullaniciSil(kulId:string){
  return this.http.delete<Sonuc[]>(this.apiUrl+"kullanicisil/"+kulId);
}

KulFotoGuncelle(kulfoto:KulFoto){
  return this.http.post(this.apiUrl+"kulfotoguncelle",kulfoto);
}

// Anket API
AnketListe(){
  return this.http.get<Anket[]>(this.apiUrl+"anketliste");
}

AnketById(anketId:string){
  return this.http.get<Anket[]>(this.apiUrl+"anketbyid/"+anketId);
}

AnketEkle(anket:Anket){
  return this.http.post<Sonuc[]>(this.apiUrl+"anketekle",anket);
}
AnketDuzenle(anket:Anket){
  return this.http.put<Sonuc[]>(this.apiUrl+"anketduzenle",anket);
}

AnketSil(anketId:string){
  return this.http.delete<Sonuc[]>(this.apiUrl+"anketsil/"+anketId);
}

KullaniciAnketListe(kulId:string){
  return this.http.get(this.apiUrl + 'kullanicianketliste/' + kulId);
}

AnketKullaniciListe(anketId:string){
  return this.http.get(this.apiUrl + 'anketkullaniciliste/' + anketId);
}

KayitEkle(kayit:Kayit){
  return this.http.post(this.apiUrl + 'kayitekle' , kayit);
}

KayitSil(kayitId:string){
  return this.http.delete(this.apiUrl + 'kayitsil' + kayitId);
}


}
