using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loka.Infrastructure.Migrations
{
    public partial class editroomandaddressfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Addresses_Rooms_RoomID",
                table: "Addresses");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_RoomID",
                table: "Addresses");

            migrationBuilder.DropColumn(
                name: "RoomID",
                table: "Addresses");

            migrationBuilder.AddColumn<int>(
                name: "AddressID",
                table: "Rooms",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_AddressID",
                table: "Rooms",
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
                name: "IX_Rooms_AddressID",
                table: "Rooms");

            migrationBuilder.DropColumn(
                name: "AddressID",
                table: "Rooms");

            migrationBuilder.AddColumn<int>(
                name: "RoomID",
                table: "Addresses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_RoomID",
                table: "Addresses",
                column: "RoomID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Addresses_Rooms_RoomID",
                table: "Addresses",
                column: "RoomID",
                principalTable: "Rooms",
                principalColumn: "RoomID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
