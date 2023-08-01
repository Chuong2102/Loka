using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loka.Infrastructure.Migrations
{
    public partial class updateroomandaddressfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Addresses_AddressID",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "AddressID",
                table: "Rooms",
                newName: "AddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Rooms_AddressID",
                table: "Rooms",
                newName: "IX_Rooms_AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_AddressID",
                table: "Addresses",
                column: "AddressID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Addresses_AddressId",
                table: "Rooms",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "AddressID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Addresses_AddressId",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_AddressID",
                table: "Addresses");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Rooms",
                newName: "AddressID");

            migrationBuilder.RenameIndex(
                name: "IX_Rooms_AddressId",
                table: "Rooms",
                newName: "IX_Rooms_AddressID");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Addresses_AddressID",
                table: "Rooms",
                column: "AddressID",
                principalTable: "Addresses",
                principalColumn: "AddressID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
