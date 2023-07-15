using System.Text.RegularExpressions;

namespace IdentityService.Utils;

public static class ValidationRules
{
    public static class Password
    {
        public static readonly Regex ContainsDigit =
            new(@"\d", RegexOptions.Compiled);

        public static readonly Regex ContainsLowercaseLetter =
            new(@"[a-z]", RegexOptions.Compiled);

        public static readonly Regex ContainsUppercaseLetter =
            new(@"[A-Z]", RegexOptions.Compiled);

        public static readonly Regex ContainsSpecialCharacter =
            new(@"[!@#$%^&*()-+={}]", RegexOptions.Compiled);

        public static readonly string NotContainsDigitMessage =
            "Password should contain a digit";

        public static readonly string NotContainsLowerCaseMessage =
            "Password should contain a lowercase letter";

        public static readonly string NotContainsUpperCaseMessage =
            "Password should contain an uppercase letter";

        public static readonly string NotContainsSpecialCharacterMessage =
            "Password should contain a special character";

        public static readonly string ShouldMatchMessage =
            "Passwords should match";
    }

    public static class Common
    {
        public static readonly Regex NoSpecialCharacters =
            new(@"^[A-z0-9]*$", RegexOptions.Compiled);

        public static readonly Regex HasLetterOrWhiteSpace =
            new(@"^[A-z\s-]*$", RegexOptions.Compiled);
    }
}
