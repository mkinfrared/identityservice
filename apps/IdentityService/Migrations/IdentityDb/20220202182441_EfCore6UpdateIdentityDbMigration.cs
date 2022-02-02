using System;

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IdentityService.Migrations.IdentityDb;

public partial class EfCore6UpdateIdentityDbMigration : Migration
{
  protected override void Up(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.AlterColumn<DateOnly>(
      "DateOfBirth",
      "AspNetUsers",
      "date",
      nullable: false,
      oldClrType: typeof(DateTime),
      oldType: "timestamp without time zone");
  }

  protected override void Down(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.AlterColumn<DateTime>(
      "DateOfBirth",
      "AspNetUsers",
      "timestamp without time zone",
      nullable: false,
      oldClrType: typeof(DateOnly),
      oldType: "date");
  }
}
