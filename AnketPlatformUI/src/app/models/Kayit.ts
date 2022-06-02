import { Anket } from './Anket';
import { Kullanici } from './Kullanici';
export class Kayit {
    kayitId:string | any;
    kayitAnketId:string | any;
    kayitKatId:string | any;
    kayitKulId:string | any;
    kulBilgi: Kullanici | any;
    anketBilgi : Anket | any;
}