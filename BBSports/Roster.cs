//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BBSports
{
    using System;
    using System.Collections.Generic;
    
    public partial class Roster
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Roster()
        {
            this.Eligibility = "Freshman";
            this.Status = "Active";
            this.Captain = false;
            this.Athletes = new HashSet<Athletes>();
        }
    
        public int RosterId { get; set; }
        public int SportId { get; set; }
        public int AthleteId { get; set; }
        public string Eligibility { get; set; }
        public string Status { get; set; }
        public bool Captain { get; set; }
    
        public virtual Sports Sport { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Athletes> Athletes { get; set; }
    }
}
