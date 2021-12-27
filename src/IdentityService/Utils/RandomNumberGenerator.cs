using System;

namespace IdentityService.Utils;

public static class RandomNumberGenerator
{
    public static int Generate(int min, int max)
    {
        Random Rnd = new Random();
        int randomNumber = Rnd.Next(min, max);

        // running a loop just to be on the safe side
        for (int i = 1; i < 100; i++)
        {
            randomNumber = Rnd.Next(min, max);
        }

        return randomNumber;
    }
}
