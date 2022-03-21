export type PasswordResetFormProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  token: string;
  userId: string;
};

export type PasswordResetFormContainerProps = Pick<
  PasswordResetFormProps,
  "className"
>;
