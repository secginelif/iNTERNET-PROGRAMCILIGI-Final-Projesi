
//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------


namespace Anketplatformm.Models
{

using System;
    using System.Collections.Generic;
    
public partial class Kayit
{

    public string kayitId { get; set; }

    public string kayitAnketId { get; set; }

    public string kayitKatId { get; set; }

    public string kayitKulId { get; set; }



    public virtual Anket Anket { get; set; }

    public virtual Kategori Kategori { get; set; }

    public virtual Kullanici Kullanici { get; set; }

}

}
