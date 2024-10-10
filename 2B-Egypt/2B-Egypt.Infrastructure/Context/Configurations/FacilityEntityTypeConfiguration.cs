
namespace _2B_Egypt.Infrastructure.Context.Configurations;

public class FacilityEntityTypeConfiguration : IEntityTypeConfiguration<Facility>
{
    public void Configure(EntityTypeBuilder<Facility> builder)
    {
        builder.HasKey(entity => entity.Id);
    }
}