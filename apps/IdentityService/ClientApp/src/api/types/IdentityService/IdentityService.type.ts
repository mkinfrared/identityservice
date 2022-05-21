/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type ApiScopeReadDto = {
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  emphasize?: boolean;
  required?: boolean;
};

export type ApiScopeUpdateDto = {
  name?: string | null;
  displayName?: string | null;
  description?: string | null;
  emphasize?: boolean;
  required?: boolean;
  isPermitted?: boolean;
};

export type ConfirmEmailCommand = {
  userId: string;
  token: string;

  /** @format int32 */
  code?: number | null;
};

export type ConsentReadDto = {
  clientName?: string | null;
  clientUrl?: string | null;
  clientLogoUrl?: string | null;
  returnUrl?: string | null;
  allowRememberConsent?: boolean;
  identityScopes?: ApiScopeReadDto[] | null;
  apiScopes?: ApiScopeReadDto[] | null;
};

export type ConsentUpdateDto = {
  redirectUrl: string;
  description: string;
  rememberConsent: boolean;
  permissionGranted: boolean;
  identityScopes: ApiScopeUpdateDto[];
  apiScopes: ApiScopeUpdateDto[];
};

export type ForgotPasswordDto = {
  email: string;
  returnUrl: string;
};

export type LoginCommand = {
  username: string;
  password: string;
  returnUrl: string;
};

/**
 * @format int32
 */
export type Providers = 0;

export type RegisterCommand = {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  passwordConfirmation?: string;
  redirectUrl?: string;
};

export type ResetPasswordCommand = {
  userId?: string;
  token?: string;
  password?: string;
  confirmPassword?: string;
};

export namespace Auth {
  /**
   * No description
   * @tags Auth
   * @name LoginCreate
   * @request POST:/Auth/Login
   * @response `200` `void` Success
   */
  export namespace LoginCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginCommand;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Auth
   * @name RegisterCreate
   * @request POST:/Auth/Register
   * @response `200` `ConfirmEmailCommand` Success
   */
  export namespace RegisterCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RegisterCommand;
    export type RequestHeaders = {};
    export type ResponseBody = ConfirmEmailCommand;
  }
  /**
   * No description
   * @tags Auth
   * @name VerifyEmailCreate
   * @request POST:/Auth/VerifyEmail
   * @response `200` `void` Success
   */
  export namespace VerifyEmailCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ConfirmEmailCommand;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Auth
   * @name LogoutList
   * @request GET:/Auth/Logout
   * @response `200` `string` Success
   */
  export namespace LogoutList {
    export type RequestParams = {};
    export type RequestQuery = { logoutId?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }
  /**
   * No description
   * @tags Auth
   * @name ForgotPasswordCreate
   * @request POST:/Auth/ForgotPassword
   * @response `200` `void` Success
   */
  export namespace ForgotPasswordCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ForgotPasswordDto;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Auth
   * @name ResetPasswordCreate
   * @request POST:/Auth/ResetPassword
   * @response `200` `void` Success
   */
  export namespace ResetPasswordCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ResetPasswordCommand;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Auth
   * @name ExternalRegisterList
   * @request GET:/Auth/ExternalRegister
   * @response `200` `void` Success
   */
  export namespace ExternalRegisterList {
    export type RequestParams = {};
    export type RequestQuery = { provider?: Providers; returnUrl?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
  /**
   * No description
   * @tags Auth
   * @name ExternalCallbackList
   * @request GET:/Auth/ExternalCallback
   * @response `200` `void` Success
   */
  export namespace ExternalCallbackList {
    export type RequestParams = {};
    export type RequestQuery = { returnUrl?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = void;
  }
}

export namespace Consent {
  /**
   * No description
   * @tags Consent
   * @name GetConsentList
   * @request GET:/Consent/GetConsent
   * @response `200` `ConsentReadDto` Success
   */
  export namespace GetConsentList {
    export type RequestParams = {};
    export type RequestQuery = { returnUrl?: string };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ConsentReadDto;
  }
  /**
   * No description
   * @tags Consent
   * @name SubmitConsentCreate
   * @request POST:/Consent/SubmitConsent
   * @response `200` `string` Success
   */
  export namespace SubmitConsentCreate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = ConsentUpdateDto;
    export type RequestHeaders = {};
    export type ResponseBody = string;
  }
}
