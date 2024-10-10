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

        modelBuilder.Entity<User>().ToTable("Users").HasKey(u => u.Id);
        modelBuilder.Entity<IdentityRole<Guid>>().ToTable("Roles").HasKey(r => r.Id);
        modelBuilder.Entity<IdentityUserRole<Guid>>().ToTable("UserRoles").HasKey(ur => new { ur.UserId, ur.RoleId });
        modelBuilder.Entity<IdentityUserClaim<Guid>>().ToTable("UserClaims");

        // Define primary key for IdentityUserLogin<Guid> entity
        modelBuilder.Entity<IdentityUserLogin<Guid>>().HasKey(l => new { l.LoginProvider, l.ProviderKey });
        modelBuilder.Entity<IdentityRoleClaim<Guid>>().ToTable("RoleClaims");
        modelBuilder.Entity<IdentityUserToken<Guid>>().ToTable("UserTokens").HasKey(ut => new { ut.UserId, ut.LoginProvider, ut.Name });
        //modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        modelBuilder.HasSequence<int>("YourSequence").StartsAt(10000000).IncrementsBy(1);

        modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration())
            .ApplyConfiguration(new BrandEntityTypeConfiguration())
            .ApplyConfiguration(new CategoryEntityTypeConfiguration())
            .ApplyConfiguration(new FacilityEntityTypeConfiguration())
            .ApplyConfiguration(new CartEntityTypeConfiguration())
            .ApplyConfiguration(new ProductImageEntityTypeConfiguration())
            .ApplyConfiguration(new PaymentEntityTypeConfiguration())
            .ApplyConfiguration(new OrderItemEntityTypeConfiguration())
            .ApplyConfiguration(new ReviewEntityTypeConfiguration())
            .ApplyConfiguration(new OrderEntityTypeConfiguration());
    }
}
