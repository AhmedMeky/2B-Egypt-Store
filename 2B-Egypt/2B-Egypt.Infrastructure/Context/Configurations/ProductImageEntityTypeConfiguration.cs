
namespace _2B_Egypt.Infrastructure.Context.Configurations;

public class ProductImageEntityTypeConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.HasOne(img => img.Product)
            .WithMany(p => p.Images)
            .HasForeignKey(img => img.ProductId)
            .OnDelete(DeleteBehavior.NoAction); 
    }
}