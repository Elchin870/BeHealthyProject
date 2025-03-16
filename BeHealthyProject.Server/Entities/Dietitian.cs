using Microsoft.AspNetCore.Identity;

namespace BeHealthyProject.Server.Entities
{
	public class Dietitian : IdentityUser
	{
        public string? Specialization { get; set; }
        public List<string> Certifications { get; set; } = new List<string>();
        public int? Experience { get; set; }
    }
}
