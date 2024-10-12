
namespace _2B_Egypt.Infrastructure.Context.Configurations;

public class CartEntityTypeConfiguration : IEntityTypeConfiguration<Cart>
{
    public void Configure(EntityTypeBuilder<Cart> builder)
    {
        builder.HasKey(entity => entity.Id);
    }
}