using Microsoft.EntityFrameworkCore;
using App.Models;
using System.Collections.Generic;
using System.IO;

namespace App.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Recipe> Recipe { get; set; }
        public DbSet<Ingridient> Ingridient {get; set;}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlite("Filename=./Recipe.db");
        }
    }
}
