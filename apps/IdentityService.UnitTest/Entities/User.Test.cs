using System;

using IdentityService.Entities;

using Xunit;

namespace IdentityService.Unit.Entities;

public class UserTest
{
  [Fact]
  public void Should_Have_Getters_And_Setters_For_DateOfBirth_Property()
  {
    var user = new User();
    var date = DateTime.Now;

    user.DateOfBirth = date;

    Assert.Equal(user.DateOfBirth, date);
  }
}
