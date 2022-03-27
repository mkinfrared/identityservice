import { ButtonProps } from "@identity-service/ui";

export type BrandButtonProps = ButtonProps & {
  /**
   * a string that will be applied as a css class to parent element
   */
  className?: string;
  brand: Brand;
};

export enum Brand {
  APPLE = "Apple",
  EPIC_GAMES = "Epic Games",
  FACEBOOK = "Facebook",
  GOOGLE = "Google",
  MICROSOFT = "Microsoft",
  STEAM = "Steam",
  VK = "VKontakte",
}
