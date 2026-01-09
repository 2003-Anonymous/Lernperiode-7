using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MissileSimulator_API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SaveGames",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Money = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false),
                    LongrangeStage = table.Column<int>(type: "INTEGER", nullable: false),
                    ShortrangeStage = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SaveGames", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SaveGames_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Markers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    X = table.Column<float>(type: "REAL", nullable: false),
                    Y = table.Column<float>(type: "REAL", nullable: false),
                    SaveGameId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Markers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Markers_SaveGames_SaveGameId",
                        column: x => x.SaveGameId,
                        principalTable: "SaveGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Buildings",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Icon", "IconX", "IconY", "Income", "Name", "Stage", "Type" },
                values: new object[] { "base", "Images/factory.png", 50, 50, 200, "Factory", 2, "economy" });

            migrationBuilder.UpdateData(
                table: "Buildings",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Category", "HitOdds", "Icon", "Name", "Type" },
                values: new object[] { "attack", null, "Images/shortrangeSilo.png", "Shortrange Silo", "shortrange" });

            migrationBuilder.InsertData(
                table: "Buildings",
                columns: new[] { "Id", "Category", "HitOdds", "Icon", "IconX", "IconY", "Income", "Name", "Range", "Stage", "Type", "Unlocked" },
                values: new object[,]
                {
                    { 4, "attack", null, "Images/missileSilo.png", 30, 30, null, "Missilesilo", null, 4, "longrange", false },
                    { 5, "defense", 0.10000000000000001, "Images/airDefense.png", 30, 30, null, "Airdefense", null, 1, "defense", true },
                    { 6, "defense", 0.02, "Images/missileDefense.png", 30, 30, null, "Missiledefense", null, 4, "defense", false }
                });

            migrationBuilder.UpdateData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Name", "Radius", "Range", "Warhead" },
                values: new object[] { "Iskander-M", 450, 500000, 600 });

            migrationBuilder.UpdateData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Name", "Radius", "Range", "Stage", "Warhead" },
                values: new object[] { "SCUD-B", 750, 300000, 1, 985 });

            migrationBuilder.UpdateData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Name", "Radius", "Range", "Stage" },
                values: new object[] { "Trident II D5", 150, 12000000, 1 });

            migrationBuilder.UpdateData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Name", "Radius", "Range", "Stage", "Warhead" },
                values: new object[] { "Minuteman III", 200, 13000000, 2, 300 });

            migrationBuilder.InsertData(
                table: "Missiles",
                columns: new[] { "Id", "Name", "Radius", "Range", "Stage", "Type", "Unlocked", "Warhead" },
                values: new object[,]
                {
                    { 6, "SS-27", 200, 11000000, 3, "longrange", false, 1200 },
                    { 7, "Tomahawk", 400, 1600000, 4, "longrange", false, 450 },
                    { 8, "DF-21", 1500, 140000, 5, "longrange", false, 600 },
                    { 9, "Hwasong-15", 300, 13000000, 6, "longrange", false, 1000 },
                    { 10, "Hwasong-17", 300, 15000000, 7, "longrange", false, 2000 },
                    { 11, "Agni-V", 300, 500000, 8, "longrange", false, 1500 },
                    { 12, "RS-24 Yars", 300, 12000000, 9, "longrange", false, 1500 },
                    { 13, "DF-41", 300, 15000000, 10, "longrange", false, 2500 },
                    { 14, "DF-5A", 500, 13000000, 11, "longrange", false, 3000 },
                    { 15, "RS-28 Sarmat", 5000, 18000000, 12, "longrange", false, 10000 },
                    { 16, "R-36M2 Voyevoda", 500, 16000000, 13, "longrange", false, 8800 },
                    { 17, "AN602", 35000, 20000000, 14, "longrange", false, 57000 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Markers_SaveGameId",
                table: "Markers",
                column: "SaveGameId");

            migrationBuilder.CreateIndex(
                name: "IX_SaveGames_UserId",
                table: "SaveGames",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Markers");

            migrationBuilder.DropTable(
                name: "SaveGames");

            migrationBuilder.DeleteData(
                table: "Buildings",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Buildings",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Buildings",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.UpdateData(
                table: "Buildings",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Category", "Icon", "IconX", "IconY", "Income", "Name", "Stage", "Type" },
                values: new object[] { "attack", "Images/missileSilo.png", 30, 30, null, "Missilesilo", 4, "longrange" });

            migrationBuilder.UpdateData(
                table: "Buildings",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Category", "HitOdds", "Icon", "Name", "Type" },
                values: new object[] { "defense", 0.10000000000000001, "Images/airDefense.png", "Airdefense", "defense" });

            migrationBuilder.UpdateData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Name", "Radius", "Range", "Warhead" },
                values: new object[] { "SCUD-B", 750, 300000, 985 });

            migrationBuilder.UpdateData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Name", "Radius", "Range", "Stage", "Warhead" },
                values: new object[] { "Iskander-M", 450, 500000, 3, 600 });

            migrationBuilder.UpdateData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Name", "Radius", "Range", "Stage" },
                values: new object[] { "Tomahawk", 400, 1600000, 2 });

            migrationBuilder.UpdateData(
                table: "Missiles",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Name", "Radius", "Range", "Stage", "Warhead" },
                values: new object[] { "DF-21", 1500, 140000, 3, 600 });
        }
    }
}
