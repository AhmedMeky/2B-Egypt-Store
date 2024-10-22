public class CreateFacilityDTO
{
    public Guid Id { get; set; }
    [Required,MinLength(3),MaxLength(20)]
    public string NameAr { get; set; }
    [Required, MinLength(3), MaxLength(20)]
    public string NameEn { get; set; }
    [Required, MinLength(1), MaxLength(40)]
    public string ValueAr { get; set; }
    [Required, MinLength(1), MaxLength(40)]
    public string ValueEn { get; set; }
}
