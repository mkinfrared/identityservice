import axios from "axios";
import { useEffect } from "react";

import css from "./Roles.module.scss";
import { RolesProps } from "./Roles.type";

const Roles = ({ className }: RolesProps) => {
  const classNames = [css.Roles, className].filter(Boolean).join(" ");

  // https://jsonplaceholder.typicode.com/todos/1?list[]=foo&list[]=bar&list[]=dash&list[]=dot
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos/1", {
      params: {
        list: ["foo", "bar", "dash", "dot"],
      },
    });
  }, []);

  return (
    <div className={classNames} data-testid="Roles">
      Roles works!!
    </div>
  );
};

export default Roles;
