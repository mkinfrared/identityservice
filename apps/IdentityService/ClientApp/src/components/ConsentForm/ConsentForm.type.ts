import { ConsentUpdateDto } from "api/types";

export type ConsentFormProps = {
  allowRememberConsent: boolean;
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  clientName: string;
  defaultValues: ConsentUpdateDto;
  returnUrl: string;
};

export type ConsentFormContainerProps = Pick<ConsentFormProps, "className">;
