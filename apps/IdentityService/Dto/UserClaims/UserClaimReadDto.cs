using System.ComponentModel.DataAnnotations;

namespace IdentityService.Dto.UserClaims;

public class UserClaimReadDto
{
    public int ClaimId { get; set; }

    public string UserId { get; set; }

    [Required]
    public string ClaimType { get; set; }

    [Required]
    public string ClaimValue { get; set; }
}
