namespace _2B_Egypt.Infrastructure.Context.Configurations;

public class CategoryEntityTypeConfiguration : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(entity => entity.NameEn).IsRequired();

        builder.Property(entity => entity.NameAr).IsRequired();

        builder.HasOne(c => c.ParentCategory)
            .WithMany(c => c.SubCategories)
            .HasForeignKey(c => c.ParentCategoryId)
            .OnDelete(DeleteBehavior.NoAction); ;
    }
}