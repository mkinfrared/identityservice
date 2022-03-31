using System.ComponentModel.DataAnnotations;

namespace IdentityService.Dto;

public class ForgotPasswordDto
{
    [Required]
    public string? Email { get; set; }

    [Required]
    public string? ReturnUrl { get; set; }

    public void Deconstruct(out string email, out string returnUrl)
    {
        email = Email;
        returnUrl = ReturnUrl;
    }
}
