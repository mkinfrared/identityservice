export type ConfirmEmailFormProps = {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  returnUrl: string;
};

export type ConfirmEmailFormContainerProps = Omit<
  ConfirmEmailFormProps,
  "returnUrl"
>;

export type ConfirmEmailFormData = {
  code: string;
};
