const express = require("express");
const bodyParser = require("body-parser");

const expressMiddleWare = (router) => {
  router.use(bodyParser.urlencoded({ extended: false }));
  router.use(bodyParser.json());

  router.get("/getConsent", (req, res) => {
    if (req.params.orderId === "error") {
      res.status(500).send("Something broke!");
    }

    // TODO create a mock for this in a separate file
    const data = {
      clientName: "identity_admin_client",
      clientUrl: null,
      clientLogoUrl: null,
      returnUrl:
        "/connect/authorize/callback?client_id=identity_admin_client&redirect_uri=https%3A%2F%2Flocalhost%3A4001%2Fsignin-callback.html&response_type=code&scope=openid%20profile%20OrdersApi&state=80ca039f3d9545ffaf5164c8c077b3ba&code_challenge=0vAESAEb1-lHzpScqjM8lg5bnVABfqCgX4plGDJlTyY&code_challenge_method=S256&response_mode=query",
      allowRememberConsent: true,
      identityScopes: [
        {
          name: "openid",
          displayName: "Your user identifier",
          description: null,
          emphasize: false,
          required: true,
        },
        {
          name: "profile",
          displayName: "User profile",
          description:
            "Your user profile information (first name, last name, etc.)",
          emphasize: true,
          required: false,
        },
      ],
      apiScopes: [
        {
          name: "OrdersApi",
          displayName: "OrdersApi",
          description: null,
          emphasize: false,
          required: false,
        },
      ],
    };

    res.send(data);
  });

  router.post("/auth/forgotPassword", (req, res) => {
    if (req.body.returnUrl === "error") {
      return res.status(500).send("Something went wrong");
    }

    res.status(200).send();
  });
};

module.exports = expressMiddleWare;
