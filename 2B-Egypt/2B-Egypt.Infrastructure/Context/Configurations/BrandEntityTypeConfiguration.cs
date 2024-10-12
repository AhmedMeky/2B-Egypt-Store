
namespace _2B_Egypt.Infrastructure.Context.Configurations;
public class BrandEntityTypeConfiguration : IEntityTypeConfiguration<Brand>
{
    public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.HasKey(entity => entity.Id);
        builder.Property(entity => entity.NameEn).IsRequired();
        builder.Property(entity => entity.NameAr).IsRequired();
    }
}