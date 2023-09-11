using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Loka.Infrastructure.Migrations
{
    public partial class add_School_Table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Schools",
                columns: table => new
                {
                    SchoolID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SchoolName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WardID = table.Column<int>(type: "int", nullable: true),
                    LocationID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schools", x => x.SchoolID);
                    table.ForeignKey(
                        name: "FK_Schools_Locations_LocationID",
                        column: x => x.LocationID,
                        principalTable: "Locations",
                        principalColumn: "LocationID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Schools_Wards_WardID",
                        column: x => x.WardID,
                        principalTable: "Wards",
                        principalColumn: "WardID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Schools_LocationID",
                table: "Schools",
                column: "LocationID");

            migrationBuilder.CreateIndex(
                name: "IX_Schools_WardID",
                table: "Schools",
                column: "WardID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Schools");
        }
    }
}
