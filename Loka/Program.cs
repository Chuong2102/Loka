using Loka.Infrastructure.Repositories;
using Loka.Infrastrure.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.RegisterServices();

// Fix CORS
builder.Services.AddControllersWithViews();

//var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy(name: MyAllowSpecificOrigins,
//        policy =>
//        {
//            policy.WithOrigins("https://localhost:3000");
//        });
//});
builder.Services.AddCors();

builder.Services.AddControllers();

builder.Services.AddDbContext<DataLokaContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionStringName"), 
    opt => opt.UseNetTopologySuite()));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// CORS CAI LOZ
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // allow any origin 
    .AllowCredentials());

app.MapControllers();



app.Run();
