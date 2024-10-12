
namespace _2B_Egypt.Infrastructure.Context.Configurations;
public class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(entity => entity.Id);
        builder.Property(entity => entity.NameEn).IsRequired();
        builder.Property(entity => entity.NameAr).IsRequired();

        builder.HasOne(p => p.Brand)
          .WithMany(b => b.Products)
          .HasForeignKey(p => p.BrandId).OnDelete(DeleteBehavior.NoAction); 

        builder.HasOne(p => p.Category)
            .WithMany(c => c.Products)
            .HasForeignKey(p => p.CategoryId).OnDelete(DeleteBehavior.NoAction);

        builder.HasMany(p => p.Facilities)
            .WithMany(c => c.Products);
    }
}
