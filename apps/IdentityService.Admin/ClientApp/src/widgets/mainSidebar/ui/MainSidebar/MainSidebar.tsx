/* eslint-disable react/no-array-index-key */

import { classNames } from "@identity-service/core";
import { LanguageSharp } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useUserSession } from "shared/lib/hooks";
import { APP_ROUTES } from "shared/types/routes";

import css from "./MainSidebar.module.scss";
import { LinkItem, MainSidebarProps } from "./MainSidebar.type";

const MainSidebar = ({ className }: MainSidebarProps) => {
  const user = useUserSession();
  const navigate = useNavigate();

  const linkItems: LinkItem[] = [
    {
      text: "Clients",
      path: APP_ROUTES.Clients.relativePath,
      icon: <LanguageSharp />,
    },
    {
      text: "Identity Resources",
      path: APP_ROUTES.IdentityResources.relativePath,
      icon: <LanguageSharp />,
    },
    {
      text: "Api Resources",
      path: APP_ROUTES.ApiResources.relativePath,
      icon: <LanguageSharp />,
    },
    {
      text: "Api Scopes",
      path: APP_ROUTES.ApiScopes.relativePath,
      icon: <LanguageSharp />,
    },
    {
      text: "Persisted Grants",
      path: APP_ROUTES.PersistedGrants.relativePath,
      icon: <LanguageSharp />,
    },
    {
      text: "Users",
      path: APP_ROUTES.Users.relativePath,
      icon: <LanguageSharp />,
    },
    {
      text: "Roles",
      path: APP_ROUTES.Roles.relativePath,
      icon: <LanguageSharp />,
    },
  ];

  const handleItemClick = (path: string) => () => {
    navigate(path, { replace: false });
  };

  if (!user) {
    return null;
  }

  return (
    <aside
      className={classNames(css.MainSidebar, className)}
      data-testid="MainSidebar"
    >
      <div>
        <List>
          {linkItems.map(({ text, path, icon }, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={handleItemClick(path)}
            >
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </aside>
  );
};

export default MainSidebar;
