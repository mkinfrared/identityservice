export type LoginFormProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  returnUrl: string;
};

export type LoginFormData = {
  username: string;
  password: string;
  returnUrl: string;
};
