using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BeHealthyProject.Server.Migrations
{
    /// <inheritdoc />
    public partial class FoodAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Foods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FatTotalG = table.Column<float>(type: "real", nullable: false),
                    FatSaturatedG = table.Column<float>(type: "real", nullable: false),
                    ProteinG = table.Column<float>(type: "real", nullable: false),
                    SodiumMg = table.Column<float>(type: "real", nullable: false),
                    PotassiumMg = table.Column<float>(type: "real", nullable: false),
                    CholesterolMg = table.Column<float>(type: "real", nullable: false),
                    CarbohydratesTotalG = table.Column<float>(type: "real", nullable: false),
                    FiberG = table.Column<float>(type: "real", nullable: false),
                    SugarG = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Foods");
        }
    }
}
