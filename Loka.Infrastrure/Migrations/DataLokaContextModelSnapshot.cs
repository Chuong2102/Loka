﻿// <auto-generated />
using System;
using Loka.Infrastrure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using NetTopologySuite.Geometries;

#nullable disable

namespace Loka.Infrastructure.Migrations
{
    [DbContext(typeof(DataLokaContext))]
    partial class DataLokaContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.16")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("FavoritePost", b =>
                {
                    b.Property<int>("FavoritesFavoriteID")
                        .HasColumnType("int");

                    b.Property<int>("PostsPostID")
                        .HasColumnType("int");

                    b.HasKey("FavoritesFavoriteID", "PostsPostID");

                    b.HasIndex("PostsPostID");

                    b.ToTable("FavoritePost");
                });

            modelBuilder.Entity("Loka.Infrastructure.Entities.School", b =>
                {
                    b.Property<int>("SchoolID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("SchoolID"), 1L, 1);

                    b.Property<int>("LocationID")
                        .HasColumnType("int");

                    b.Property<string>("SchoolName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("WardID")
                        .HasColumnType("int");

                    b.HasKey("SchoolID");

                    b.HasIndex("LocationID");

                    b.HasIndex("WardID");

                    b.ToTable("Schools");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Account", b =>
                {
                    b.Property<int>("AccountID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AccountID"), 1L, 1);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AccountID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Address", b =>
                {
                    b.Property<int>("AddressID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AddressID"), 1L, 1);

                    b.Property<string>("AddressLine1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AddressLine2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PostalCare")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoomID")
                        .HasColumnType("int");

                    b.Property<int?>("WardID")
                        .HasColumnType("int");

                    b.HasKey("AddressID");

                    b.HasIndex("RoomID")
                        .IsUnique();

                    b.HasIndex("WardID");

                    b.ToTable("Addresses");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Area", b =>
                {
                    b.Property<int>("AreaID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AreaID"), 1L, 1);

                    b.Property<double>("AreaNumber")
                        .HasColumnType("float");

                    b.Property<int>("CategoryID")
                        .HasColumnType("int");

                    b.HasKey("AreaID");

                    b.HasIndex("CategoryID");

                    b.ToTable("Areas");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Category", b =>
                {
                    b.Property<int>("CategoryID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CategoryID"), 1L, 1);

                    b.Property<string>("CategoryDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CategoryName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoomID")
                        .HasColumnType("int");

                    b.HasKey("CategoryID");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.City", b =>
                {
                    b.Property<int>("CityID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CityID"), 1L, 1);

                    b.Property<string>("CityName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CityID");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Favorite", b =>
                {
                    b.Property<int>("FavoriteID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("FavoriteID"), 1L, 1);

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("UserID")
                        .HasColumnType("int");

                    b.HasKey("FavoriteID");

                    b.HasIndex("UserID")
                        .IsUnique();

                    b.ToTable("Favorites");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Location", b =>
                {
                    b.Property<int>("LocationID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LocationID"), 1L, 1);

                    b.Property<double>("Latitude")
                        .HasColumnType("float");

                    b.Property<Point>("LocationPoint")
                        .IsRequired()
                        .HasColumnType("geography");

                    b.Property<double>("Longitude")
                        .HasColumnType("float");

                    b.Property<string>("PlaceID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RoomID")
                        .HasColumnType("int");

                    b.HasKey("LocationID");

                    b.HasIndex("RoomID")
                        .IsUnique();

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Photo", b =>
                {
                    b.Property<int>("PhotoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PhotoId"), 1L, 1);

                    b.Property<DateTime?>("CreatedTime")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("RoomID")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PhotoId");

                    b.HasIndex("RoomID");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Post", b =>
                {
                    b.Property<int>("PostID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PostID"), 1L, 1);

                    b.Property<DateTime>("PostedDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("RoomID")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PostID");

                    b.HasIndex("RoomID")
                        .IsUnique();

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Price", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int>("CategoryID")
                        .HasColumnType("int");

                    b.Property<int>("PriceNumber")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryID");

                    b.ToTable("Prices");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Role", b =>
                {
                    b.Property<int>("RoleID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleID"), 1L, 1);

                    b.Property<string>("RoleName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleID");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Room", b =>
                {
                    b.Property<int>("RoomID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoomID"), 1L, 1);

                    b.Property<double>("Area")
                        .HasColumnType("float");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int?>("UserID")
                        .HasColumnType("int");

                    b.HasKey("RoomID");

                    b.HasIndex("UserID");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Tag", b =>
                {
                    b.Property<int>("TagID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TagID"), 1L, 1);

                    b.Property<int>("PostID")
                        .HasColumnType("int");

                    b.Property<string>("TagName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TagID");

                    b.HasIndex("PostID");

                    b.ToTable("Tags");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserID"), 1L, 1);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Phone")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RegistrationDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("RoleID")
                        .HasColumnType("int");

                    b.HasKey("UserID");

                    b.HasIndex("RoleID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Ward", b =>
                {
                    b.Property<int>("WardID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("WardID"), 1L, 1);

                    b.Property<int?>("CityID")
                        .HasColumnType("int");

                    b.Property<string>("WardName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("WardID");

                    b.HasIndex("CityID");

                    b.ToTable("Wards");
                });

            modelBuilder.Entity("FavoritePost", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Favorite", null)
                        .WithMany()
                        .HasForeignKey("FavoritesFavoriteID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Loka.Infrastrure.Entities.Post", null)
                        .WithMany()
                        .HasForeignKey("PostsPostID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Loka.Infrastructure.Entities.School", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Location", "Location")
                        .WithMany()
                        .HasForeignKey("LocationID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Loka.Infrastrure.Entities.Ward", "Ward")
                        .WithMany()
                        .HasForeignKey("WardID");

                    b.Navigation("Location");

                    b.Navigation("Ward");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Account", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.User", "User")
                        .WithOne("Account")
                        .HasForeignKey("Loka.Infrastrure.Entities.Account", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Address", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Room", "Room")
                        .WithOne("Address")
                        .HasForeignKey("Loka.Infrastrure.Entities.Address", "RoomID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Loka.Infrastrure.Entities.Ward", "Ward")
                        .WithMany()
                        .HasForeignKey("WardID");

                    b.Navigation("Room");

                    b.Navigation("Ward");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Area", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Favorite", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.User", "User")
                        .WithOne("Favorite")
                        .HasForeignKey("Loka.Infrastrure.Entities.Favorite", "UserID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Location", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Room", "Room")
                        .WithOne("Location")
                        .HasForeignKey("Loka.Infrastrure.Entities.Location", "RoomID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Photo", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Room", "Room")
                        .WithMany()
                        .HasForeignKey("RoomID");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Post", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Room", "Room")
                        .WithOne("Post")
                        .HasForeignKey("Loka.Infrastrure.Entities.Post", "RoomID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Room");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Price", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Room", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserID");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Tag", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Post", "Post")
                        .WithMany()
                        .HasForeignKey("PostID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.User", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleID");

                    b.Navigation("Role");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Ward", b =>
                {
                    b.HasOne("Loka.Infrastrure.Entities.City", "City")
                        .WithMany()
                        .HasForeignKey("CityID");

                    b.Navigation("City");
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.Room", b =>
                {
                    b.Navigation("Address");

                    b.Navigation("Location");

                    b.Navigation("Post")
                        .IsRequired();
                });

            modelBuilder.Entity("Loka.Infrastrure.Entities.User", b =>
                {
                    b.Navigation("Account");

                    b.Navigation("Favorite");
                });
#pragma warning restore 612, 618
        }
    }
}
