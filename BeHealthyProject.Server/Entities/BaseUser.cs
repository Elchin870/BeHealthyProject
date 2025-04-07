using Microsoft.AspNetCore.Identity;

namespace BeHealthyProject.Server.Entities
{
	public class BaseUser : IdentityUser
	{
        public string? Nickname { get; set; }
        public bool IsCompleteProfile { get; set; } = false;
    }
}
