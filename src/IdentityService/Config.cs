// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.

using System.Collections.Generic;

using IdentityModel;

using IdentityServer4;
using IdentityServer4.Models;

namespace IdentityService
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("scope1"),
                new ApiScope("scope2"),
                new ApiScope("OrdersApi"),
                new ApiScope("ClientMvc")
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                // m2m client credentials flow client
                new Client
                {
                    ClientId = "m2m.client",
                    ClientName = "Client Credentials Client",

                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    ClientSecrets = {new Secret("511536EF-F270-4058-80CA-1C89C192F69A".Sha256())},

                    AllowedScopes = {"scope1"}
                },

                // interactive client using code flow + pkce
                new Client
                {
                    ClientId = "interactive",
                    ClientSecrets = {new Secret("49C1A7E1-0C79-4A89-A3D6-A37998FB86B0".Sha256())},

                    AllowedGrantTypes = GrantTypes.Code,

                    RedirectUris = {"https://localhost:44300/signin-oidc"},
                    FrontChannelLogoutUri = "https://localhost:44300/signout-oidc",
                    PostLogoutRedirectUris = {"https://localhost:44300/signout-callback-oidc"},

                    AllowOfflineAccess = true,
                    AllowedScopes = {"openid", "profile", "scope2"}
                },
                                new Client
                {
                    ClientId = "client_id",
                    ClientSecrets = {new Secret("client_secret".ToSha256())},
                    AllowedGrantTypes = GrantTypes.ClientCredentials,
                    AllowedScopes =
                    {
                        "OrdersApi",
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    }
                },
                new Client
                {
                    ClientId = "client_id_mvc",
                    ClientSecrets = {new Secret("client_secret_mvc".ToSha256())},
                    AllowedGrantTypes = GrantTypes.Code,
                    AllowedScopes =
                    {
                        "ClientMvc",
                        "OrdersApi",
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    },
                    RedirectUris = {"https://localhost:2001/signin-oidc"},
                    PostLogoutRedirectUris = {"https://localhost:2001/signout-callback-oidc"},
                    FrontChannelLogoutUri = "http://localhost:2001",
                    RequireConsent = false,
                    // Token lifetime in seconds
                    AccessTokenLifetime = 10,
                    // Sets refresh token
                    AllowOfflineAccess = true
                    // IdentityTokenLifetime = 5
                    // AlwaysIncludeUserClaimsInIdToken = true
                },
                new Client
                {
                    ClientId = "spa_client",
                    AllowedGrantTypes = GrantTypes.Code,
                    // AllowedGrantTypes = GrantTypes.Implicit,
                    RedirectUris =
                    {
                        "https://localhost:4001/signin-callback.html",
                        "http://localhost:3000/signin-callback.html",
                        "https://localhost:4001/silent-renew.html",
                        "http://localhost:3000/silent-renew.html"
                    },
                    PostLogoutRedirectUris =
                        {"https://localhost:4001/logout", "http://localhost:3000/logout"},
                    AllowedCorsOrigins = new List<string>
                        {"https://localhost:4001", "http://localhost:3000"},
                    // ClientUri =
                    AllowedScopes =
                    {
                        "ClientMvc",
                        "OrdersApi",
                        IdentityServerConstants.StandardScopes.OpenId,
                        IdentityServerConstants.StandardScopes.Profile
                    },
                    RequirePkce = true,
                    AllowAccessTokensViaBrowser = true,
                    AllowOfflineAccess = true,

                    RequireConsent = false,
                    RequireClientSecret = false,
                    AccessTokenLifetime = 5,
                    // Token lifetime in seconds
                    // Sets refresh token
                    // AllowOfflineAccess = true,
                    // IdentityTokenLifetime = 5
                    // AlwaysIncludeUserClaimsInIdToken = true
                }

            };

        public static IEnumerable<ApiResource> Resources => new ApiResource[]
        {
            new ApiResource {Name = "OrdersApi", Scopes = {"OrdersApi"}},
            new ApiResource {Name = "ClientMvc", Scopes = {"ClientMvc"}}
        };
    }
}
