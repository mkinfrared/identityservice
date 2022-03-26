export type RegisterFormProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  returnUrl: string;
};

export type RegisterFormContainerProps = Omit<RegisterFormProps, "returnUrl">;
