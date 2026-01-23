using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MissileSimulator_API.Migrations
{
    /// <inheritdoc />
    public partial class AddBuildingIdToSaveGame : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Y",
                table: "Markers",
                newName: "Lng");

            migrationBuilder.RenameColumn(
                name: "X",
                table: "Markers",
                newName: "Lat");

            migrationBuilder.AddColumn<int>(
                name: "BuildingId",
                table: "Markers",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuildingId",
                table: "Markers");

            migrationBuilder.RenameColumn(
                name: "Lng",
                table: "Markers",
                newName: "Y");

            migrationBuilder.RenameColumn(
                name: "Lat",
                table: "Markers",
                newName: "X");
        }
    }
}
