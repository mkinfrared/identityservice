using System;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Entities
{
    public class User: IdentityUser
    {
        public DateTime DateOfBirth { get; set; }
    }
}
