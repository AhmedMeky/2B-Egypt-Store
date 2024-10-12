namespace _2B_Egypt.Domain.Models;
public class Facility : BaseEntity
{
    public string NameAr { get; set; }
    public string NameEn { get; set; }
    public string ValueAr { get; set; }
    public string ValueEn { get; set; }
    public virtual ICollection<Product> Products { get; set; }
}