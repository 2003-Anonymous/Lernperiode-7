using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MissileSimulator_API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Buildings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Category = table.Column<string>(type: "TEXT", nullable: false),
                    Icon = table.Column<string>(type: "TEXT", nullable: false),
                    IconX = table.Column<int>(type: "INTEGER", nullable: false),
                    IconY = table.Column<int>(type: "INTEGER", nullable: false),
                    Income = table.Column<int>(type: "INTEGER", nullable: true),
                    Range = table.Column<int>(type: "INTEGER", nullable: true),
                    HitOdds = table.Column<double>(type: "REAL", nullable: true),
                    Unlocked = table.Column<bool>(type: "INTEGER", nullable: false),
                    Stage = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Buildings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Missiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Type = table.Column<string>(type: "TEXT", nullable: false),
                    Warhead = table.Column<int>(type: "INTEGER", nullable: false),
                    Radius = table.Column<int>(type: "INTEGER", nullable: false),
                    Range = table.Column<int>(type: "INTEGER", nullable: false),
                    Unlocked = table.Column<bool>(type: "INTEGER", nullable: false),
                    Stage = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Missiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    Role = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Buildings",
                columns: new[] { "Id", "Category", "HitOdds", "Icon", "IconX", "IconY", "Income", "Name", "Range", "Stage", "Type", "Unlocked" },
                values: new object[,]
                {
                    { 1, "base", null, "Images/mainBase.png", 30, 30, 100, "Mainbase", null, 1, "base", true },
                    { 2, "attack", null, "Images/missileSilo.png", 30, 30, null, "Missilesilo", null, 4, "longrange", false },
                    { 3, "defense", 0.10000000000000001, "Images/airDefense.png", 30, 30, null, "Airdefense", null, 1, "defense", true }
                });

            migrationBuilder.InsertData(
                table: "Missiles",
                columns: new[] { "Id", "Name", "Radius", "Range", "Stage", "Type", "Unlocked", "Warhead" },
                values: new object[,]
                {
                    { 1, "ATACMS", 300, 300000, 1, "shortrange", true, 230 },
                    { 2, "SCUD-B", 750, 300000, 2, "shortrange", false, 985 },
                    { 3, "Iskander-M", 450, 500000, 3, "shortrange", false, 600 },
                    { 4, "Tomahawk", 400, 1600000, 2, "longrange", false, 450 },
                    { 5, "DF-21", 1500, 140000, 3, "longrange", false, 600 }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Password", "Role", "Username" },
                values: new object[,]
                {
                    { 1, "1234", "admin", "Joshua" },
                    { 2, "4321", "user", "User" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Buildings");

            migrationBuilder.DropTable(
                name: "Missiles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
