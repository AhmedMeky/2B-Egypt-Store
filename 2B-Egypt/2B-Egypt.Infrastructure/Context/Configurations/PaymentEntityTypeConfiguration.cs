namespace _2B_Egypt.Infrastructure.Context.Configurations;

public class PaymentEntityTypeConfiguration : IEntityTypeConfiguration<Payment>
{
    public void Configure(EntityTypeBuilder<Payment> builder)
    {
        builder.HasKey(entity => entity.Id);
        builder.HasOne(p => p.Order)
                .WithOne(o => o.Payment)
                .HasForeignKey<Payment>(p => p.OrderId).OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(p => p.User)
           .WithMany(o => o.Payments)
           .HasForeignKey(p => p.UserId).OnDelete(DeleteBehavior.NoAction);
    }
}