using BeHealthyProject.Server.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BeHealthyProject.Server.Data
{
	public class BeHealthyDbContext : IdentityDbContext<IdentityUser>
	{
		public BeHealthyDbContext(DbContextOptions options) : base(options)
		{
		}
		public DbSet<User> Users { get; set; }

        public DbSet<Dietitian> Dietitians { get; set; }
    }
}
