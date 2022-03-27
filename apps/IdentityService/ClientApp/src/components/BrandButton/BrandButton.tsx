import { classNames } from "@identity-service/core";
import { Button } from "@identity-service/ui";
import { FunctionComponent, HTMLAttributes, createElement, memo } from "react";

import { ReactComponent as Apple } from "icons/brands/apple.svg";
import { ReactComponent as Epic } from "icons/brands/epic-games.svg";
import { ReactComponent as Facebook } from "icons/brands/facebook.svg";
import { ReactComponent as Google } from "icons/brands/google.svg";
import { ReactComponent as Microsoft } from "icons/brands/microsoft.svg";
import { ReactComponent as Steam } from "icons/brands/steam.svg";
import { ReactComponent as Vk } from "icons/brands/vk.svg";

import css from "./BrandButton.module.scss";
import { Brand, BrandButtonProps } from "./BrandButton.type";

const brandIcons: Record<
  Brand,
  FunctionComponent<HTMLAttributes<SVGSVGElement>>
> = {
  [Brand.APPLE]: Apple,
  [Brand.EPIC_GAMES]: Epic,
  [Brand.FACEBOOK]: Facebook,
  [Brand.GOOGLE]: Google,
  [Brand.MICROSOFT]: Microsoft,
  [Brand.STEAM]: Steam,
  [Brand.VK]: Vk,
};

const BrandButton = ({ className, brand, ...rest }: BrandButtonProps) => {
  let brandClass: string;

  switch (brand) {
    case Brand.APPLE:
      brandClass = css.apple;

      break;
    case Brand.EPIC_GAMES:
      brandClass = css.epic;

      break;
    case Brand.FACEBOOK:
      brandClass = css.facebook;

      break;
    case Brand.GOOGLE:
      brandClass = css.google;

      break;
    case Brand.MICROSOFT:
      brandClass = css.microsoft;

      break;
    case Brand.STEAM:
      brandClass = css.steam;

      break;
    default:
      brandClass = css.vk;
  }

  const brandIcon = createElement(brandIcons[brand], {
    className: css.brandIcon as string,
  });

  return (
    <Button
      className={classNames(css.BrandButton, brandClass, className)}
      {...rest}
    >
      {brandIcon}
      {brand}
    </Button>
  );
};

export { BrandButton };

export default memo(BrandButton);
