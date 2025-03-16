using Microsoft.AspNetCore.Identity;

namespace BeHealthyProject.Server.Entities
{
	public class User : IdentityUser
	{
		public int? Age { get; set; } 
		public double? Height { get; set; } 
		public double? Weight { get; set; } 
	}
}
