/* eslint-disable react/no-array-index-key */

import { classNames } from "@identity-service/core";

import { useUserSession } from "shared/lib/hooks";
import { APP_ROUTES } from "shared/types/routes";

import css from "./MainSidebar.module.scss";
import { LinkItem, MainSidebarProps } from "./MainSidebar.type";

const MainSidebar = ({ className }: MainSidebarProps) => {
  const user = useUserSession();

  const linkItems: LinkItem[] = [
    { text: "Clients", path: APP_ROUTES.CLIENTS.relativePath },
  ];

  if (!user) {
    return null;
  }

  return (
    <aside
      className={classNames(css.MainSidebar, className)}
      data-testid="MainSidebar"
    >
      {linkItems.map(({ text, path }, index) => (
        <li key={index}>
          {text} {path}
        </li>
      ))}
    </aside>
  );
};

export default MainSidebar;
