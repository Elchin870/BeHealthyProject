using Microsoft.AspNetCore.Identity;

namespace BeHealthyProject.Entities
{
    public class Dietitian : BaseUser
    {
        public string? Specialization { get; set; }
        public List<string> Certifications { get; set; } = new List<string>();
        public int? Experience { get; set; }
    }
}
