// unset

using System.Threading.Tasks;

using IdentityService.Dto;
using IdentityService.Entities;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromForm]LoginDto loginDto)
        {
            // IdentityServer4.Endpoints.DiscoveryEndpoint

            var user = await _userManager.FindByNameAsync(loginDto.Username);

            if (user == null)
            {
                return NotFound();
            }

            var signInResult = await
                _signInManager.PasswordSignInAsync(user, loginDto.Password, true, false);

            if (signInResult.Succeeded)
            {
                return Redirect(loginDto.ReturnUrl);
            }

            return BadRequest();
        }
    }
}
