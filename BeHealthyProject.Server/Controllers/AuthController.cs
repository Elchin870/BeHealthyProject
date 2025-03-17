using BeHealthyProject.Server.Data;
using BeHealthyProject.Server.Dtos;
using BeHealthyProject.Server.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BeHealthyProject.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly UserManager<Dietitian> _dietitianManager;
		private readonly UserManager<User> _userManager;
		private readonly RoleManager<IdentityRole> _roleManager;
		private readonly BeHealthyDbContext _beHealthyDbContext;
		private readonly IConfiguration _configuration;

		public AuthController(UserManager<Dietitian> dietitianManager, UserManager<User> userManager, RoleManager<IdentityRole> roleManager, BeHealthyDbContext beHealthyDbContext, IConfiguration configuration)
		{
			_dietitianManager = dietitianManager;
			_userManager = userManager;
			_roleManager = roleManager;
			_beHealthyDbContext = beHealthyDbContext;
			_configuration = configuration;
		}

		[HttpPost("signup-user")]
		public async Task<ActionResult> SignUpAsUser([FromBody]RegisterDto dto)
		{
			var user = new User
			{
				UserName = dto.Username,
				Email = dto.Email,
			};
			var result = await _userManager.CreateAsync(user,dto.Password);
			if (result.Succeeded)
			{
				if (!await _roleManager.RoleExistsAsync("User"))
				{
					await _roleManager.CreateAsync(new IdentityRole("User"));
				}
				await _userManager.AddToRoleAsync(user, "User");
				_beHealthyDbContext.AddAsync(user);
				_beHealthyDbContext.SaveChangesAsync();
				return Ok(new
				{
					Status = "Success",
					Message = "User created succesfully"
				});
			}
			return BadRequest();
		}
		[HttpPost("signup-dietitian")]
		public async Task<ActionResult> SignUpAsDietitian([FromBody]RegisterDto dto)
		{
			var dietitian = new Dietitian
			{
				UserName = dto.Username,
				Email = dto.Email,
			};
			var result = await _dietitianManager.CreateAsync(dietitian, dto.Password);
			if (result.Succeeded)
			{
				if (!await _roleManager.RoleExistsAsync("Dietitian"))
				{
					await _roleManager.CreateAsync(new IdentityRole("Dietitian"));
				}
				await _dietitianManager.AddToRoleAsync(dietitian,"Dietitian");

				return Ok(new	
				{
					Status = "Success",
					Message = "Dietitian created succesfully"
				});
			}
			return BadRequest();
		}

		[HttpPost("signin-user")]
		public async Task<IActionResult> SignInForUser([FromBody] LoginDto dto)
		{
			var user = await _userManager.FindByNameAsync(dto.Username);

			if (user != null && await _userManager.CheckPasswordAsync(user, dto.Password))
			{
				var userRoles = await _userManager.GetRolesAsync(user);

				var authClaims = new List<Claim>
				{
					new Claim(ClaimTypes.Name,user.UserName),
					new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
				};

				foreach (var role in userRoles)
				{
					authClaims.Add(new Claim(ClaimTypes.Role, role));
				}

				var token = GetToken(authClaims);

				return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token), Expiration = token.ValidTo });
			}

			return Unauthorized();
		}

		[HttpPost("signin-dietitian")]
		public async Task<IActionResult> SignInForDietitian([FromBody] LoginDto dto)
		{
			var user = await _dietitianManager.FindByNameAsync(dto.Username);

			if (user != null && await _dietitianManager.CheckPasswordAsync(user, dto.Password))
			{
				var userRoles = await _dietitianManager.GetRolesAsync(user);

				var authClaims = new List<Claim>
				{
					new Claim(ClaimTypes.Name,user.UserName),
					new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
				};

				foreach (var role in userRoles)
				{
					authClaims.Add(new Claim(ClaimTypes.Role, role));
				}

				var token = GetToken(authClaims);

				return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token), Expiration = token.ValidTo });
			}

			return Unauthorized();
		}


		private JwtSecurityToken GetToken(List<Claim> authClaims)
		{
			var authSigninKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

			var token = new JwtSecurityToken(
				issuer: _configuration["Jwt:Issuer"],
				audience: _configuration["Jwt:Audience"],
				expires: DateTime.Now.AddHours(3),
				claims: authClaims,
				signingCredentials: new SigningCredentials(authSigninKey, SecurityAlgorithms.HmacSha256)
				);

			return token;
		}

        [Authorize(Roles = "User")] 
        [HttpGet("protected-user")]
        public ActionResult<string> ProtectedEndpoint()
        {
            var user = HttpContext.User;

            if (user.Identity == null || !user.Identity.IsAuthenticated)
                return Unauthorized("Invalid Token");

            var name = user.FindFirst(ClaimTypes.Name)?.Value ?? "Unknown";
            var role = user.FindFirst(ClaimTypes.Role)?.Value ?? "Unknown";

            return Ok($"Hello {name}, you are authenticated as a {role}!");
        }

        [Authorize(Roles = "Dietitian")] 
        [HttpGet("protected-dietitian")]
        public ActionResult<string> ProtectedEndpointDietitian()
        {
            var user = HttpContext.User;

            if (user.Identity == null || !user.Identity.IsAuthenticated)
                return Unauthorized("Invalid Token");

            var name = user.FindFirst(ClaimTypes.Name)?.Value ?? "Unknown";
            var role = user.FindFirst(ClaimTypes.Role)?.Value ?? "Unknown";

            return Ok($"Hello {name}, you are authenticated as a {role}!");
        }
    }

}
