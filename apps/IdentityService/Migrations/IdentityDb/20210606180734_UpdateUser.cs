using Microsoft.EntityFrameworkCore.Migrations;

namespace IdentityService.Migrations.IdentityDb;

public partial class UpdateUser : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<string>(
            "FirstName",
            "AspNetUsers",
            "text",
            nullable: true
        );

        migrationBuilder.AddColumn<string>(
            "LastName",
            "AspNetUsers",
            "text",
            nullable: true
        );
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn("FirstName", "AspNetUsers");

        migrationBuilder.DropColumn("LastName", "AspNetUsers");
    }
}
