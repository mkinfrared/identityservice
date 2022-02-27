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

export type ConfirmEmailCommand = {
  userId: string;
  token: string;

  /** @format int32 */
  code?: number | null;
};

export type LoginCommand = {
  username: string;
  password: string;
  returnUrl: string;
};

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
}
