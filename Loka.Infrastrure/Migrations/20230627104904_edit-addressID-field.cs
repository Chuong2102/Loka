using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loka.Infrastructure.Migrations
{
    public partial class editaddressIDfield : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Addresses_AddressID",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Rooms_AddressID",
                table: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Addresses_AddressID",
                table: "Addresses");

            migrationBuilder.AlterColumn<int>(
                name: "RoomID",
                table: "Rooms",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Addresses_RoomID",
                table: "Rooms",
                column: "RoomID",
                principalTable: "Addresses",
                principalColumn: "AddressID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Addresses_RoomID",
                table: "Rooms");

            migrationBuilder.AlterColumn<int>(
                name: "RoomID",
                table: "Rooms",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.CreateIndex(
                name: "IX_Rooms_AddressID",
                table: "Rooms",
                column: "AddressID");

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
    }
}