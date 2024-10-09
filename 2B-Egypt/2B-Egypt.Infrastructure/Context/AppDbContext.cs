
namespace _2B_Egypt.Infrastructure.Context;

public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public AppDbContext()
    {
    }
    public AppDbContext(DbContextOptions<AppDbContext> optionsBuilder) : base(optionsBuilder)
    {
        
    }

    //public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Brand> Brands { get; set; }
    public virtual DbSet<Category> Categories { get; set; }
    public virtual DbSet<Product> Products { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<Review> Reviews { get; set; }
    public virtual DbSet<OrderItem> OrderItems { get; set; }
    public virtual DbSet<Cart> Carts { get; set; }
    public virtual DbSet<Facility> Facilities { get; set; }
    public virtual DbSet<Payment> Payments { get; set; }
    public virtual DbSet<ProductImage> ProductImages { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
