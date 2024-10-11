
using Microsoft.EntityFrameworkCore;

namespace _2B_Egypt.Infrastructure.Context.Configurations;

public class OrderEntityTypeConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasKey(entity => entity.Id);

        builder.Property(e => e.OrderNumber)
                .HasDefaultValueSql("NEXT VALUE FOR YourSequence")
                .IsRequired();

        builder.HasOne(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId).OnDelete(DeleteBehavior.NoAction);

    }
}