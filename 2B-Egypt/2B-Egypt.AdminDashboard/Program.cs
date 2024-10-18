
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddHttpClient();

builder.Services.AddSession();


//builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
//          .AddCookie(options =>
//          {
//              options.LoginPath = "/Admin/Login";
//              options.AccessDeniedPath = "/Admin/AccessDenied";
//          });

//builder.Services.AddAuthorization(options =>
//{
//    options.DefaultPolicy = new AuthorizationPolicyBuilder()
//        .RequireAuthenticatedUser()
//        .Build();
//});

//builder.Services.AddTransient<AdminController>();



builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("2B-Egypt.AdminDashboard"));
});

builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

// inject your dependencies here ===================================

//builder.Services.AddScoped<AppDbContext>();
builder.Services.AddScoped<UserManager<User>, UserManager<User>>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<IBrandRepository, BrandRepository>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IFacilityService, FacilityService>();
builder.Services.AddScoped<IFacilityRepository, FacilityRepository>();

// ========================================================================




var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();


app.UseRouting();

app.UseSession();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
