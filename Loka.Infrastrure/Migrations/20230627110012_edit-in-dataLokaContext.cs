using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loka.Infrastructure.Migrations
{
    public partial class editindataLokaContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Addresses_AddressID",
                table: "Rooms");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_AddressID",
                table: "Addresses",
                column: "AddressID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Addresses_AddressID",
                table: "Rooms",
                column: "AddressID",
                principalTable: "Addresses",
                principalColumn: "AddressID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Addresses_AddressID",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_AddressID",
                table: "Addresses");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Addresses_AddressID",
                table: "Rooms",
                column: "AddressID",
                principalTable: "Addresses",
                principalColumn: "AddressID");
        }
    }
}
