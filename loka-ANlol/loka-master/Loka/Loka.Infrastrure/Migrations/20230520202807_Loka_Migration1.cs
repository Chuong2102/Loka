using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loka.Infrastructure.Migrations
{
    public partial class Loka_Migration1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_Rooms_RoomID",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_RoomID",
                table: "Categories");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Categories_RoomID",
                table: "Categories",
                column: "RoomID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_Rooms_RoomID",
                table: "Categories",
                column: "RoomID",
                principalTable: "Rooms",
                principalColumn: "RoomID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
