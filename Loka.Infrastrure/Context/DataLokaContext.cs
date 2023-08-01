using Microsoft.EntityFrameworkCore;
using Loka.Infrastrure.Entities;
using System.Reflection.Metadata;

namespace Loka.Infrastrure.Context
{
    public class DataLokaContext : DbContext
    {
        public DataLokaContext(DbContextOptions<DataLokaContext> options) : base(options)
        {
        }

        public DbSet<Account> Accounts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Price> Prices { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Ward> Wards { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User - Account one to one relation
            modelBuilder.Entity<User>()
                .HasOne(e => e.Account)
                .WithOne(e => e.User)
                .HasForeignKey<Account>(e => e.UserID)
                .IsRequired();

            // Room - Address
           
            modelBuilder.Entity<Address>(entity => { entity.HasIndex(p => p.AddressId); });
            modelBuilder.Entity<Room>().HasOne(c => c.Address).WithMany(t => t.Rooms).OnDelete(DeleteBehavior.Cascade);
            // Room - Location
            modelBuilder.Entity<Room>()
                .HasOne(e => e.Location)
                .WithOne(e => e.Room)
                .HasForeignKey<Location>(e => e.RoomID)
                .IsRequired();

            // User - Favor
            modelBuilder.Entity<User>()
                .HasOne(e => e.Favorite)
                .WithOne(e => e.User)
                .HasForeignKey<Favorite>(e => e.UserID)
                .IsRequired();
        }
    }
}