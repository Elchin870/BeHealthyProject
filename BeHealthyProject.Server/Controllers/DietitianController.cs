using BeHealthyProject.Entities;
using BeHealthyProject.Entities.Dtos;
using BeHealthyProject.Server.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BeHealthyProject.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	[Authorize(Roles ="Dietitian")]
	public class DietitianController : ControllerBase
	{
		private readonly UserManager<BaseUser> _userManager;

		public DietitianController(UserManager<BaseUser> userManager)
		{
			_userManager = userManager;
		}

		[HttpPut("update-profile")]
		public async Task<ActionResult> UpdateProfile([FromBody] CompleteDietitianProfileDto dto)
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (string.IsNullOrEmpty(userId))
			{
				return Unauthorized("Invalid token.");
			}

			var baseUser = await _userManager.FindByIdAsync(userId);
			var user = baseUser as Dietitian;

			if (user == null)
			{
				return NotFound("User not found!");
			}

			if (dto.Experience != null && dto.Specialization != null && dto.Certifications != null )
			{
				
				user.Experience = dto.Experience;
				user.Specialization = dto.Specialization;
				user.Certifications = dto.Certifications;
				user.Price = dto.Price;

			}


			var result = await _userManager.UpdateAsync(user);

			if (result.Succeeded)
			{
				user.IsCompleteProfile = true;
				await _userManager.UpdateAsync(user);
				return Ok(new { message = "Profile updated successfully!" });
			}
			else
			{
				return BadRequest(new { message = "Failed to update profile", errors = result.Errors });
			}

		}
		[HttpGet("get-profile")]
		public async Task<ActionResult> GetProfileData()
		{
			var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
			if (userId == null)
			{
				return NotFound("User not found!");
			}
			var baseUser = await _userManager.FindByIdAsync(userId);
			var user = baseUser as Dietitian;
			if (user == null) { return NotFound(); }
			return Ok(new ShowDietitianDto { Specialization = user.Specialization, Experience = user.Experience, Certifications = user.Certifications, Nickname = user.Nickname, Username = user.UserName, isComplete=user.IsCompleteProfile, Price = user.Price});
		}

	}
}
