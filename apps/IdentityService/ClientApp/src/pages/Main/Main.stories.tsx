import { Button } from "@identity-service/ui";
import { Meta, Story } from "@storybook/react";
import { useNavigate } from "react-router-dom";

import { MainRoutes } from "routes/MainRoute";
import { withQueryProvider, withRouter } from "utils/storybookDecorators";

import { Main } from "./Main";
import css from "./Main.module.scss";
import { MainProps } from "./Main.type";

const searchParams = {
  [MainRoutes.LOGIN]: new URL(
    "https://localhost:2001/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Didentity_admin_client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520OrdersApi%26state%3D6ef878dd486a4d0fb0b9649a15106bef%26code_challenge%3D9Icudd-LqhVbS-vZmKuDuy6Zc5XKRYdkujGhr8eME98%26code_challenge_method%3DS256%26response_mode%3Dquery",
  ),
  [MainRoutes.REGISTER]: new URL(
    "https://localhost:2001/account/register?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Didentity_admin_client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520OrdersApi%26state%3D6ef878dd486a4d0fb0b9649a15106bef%26code_challenge%3D9Icudd-LqhVbS-vZmKuDuy6Zc5XKRYdkujGhr8eME98%26code_challenge_method%3DS256%26response_mode%3Dquery",
  ),
  [MainRoutes.CONFIRM_EMAIL]: new URL(
    "https://localhost:2001/account/confirmEmail?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Didentity_admin_client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520OrdersApi%26state%3D6ef878dd486a4d0fb0b9649a15106bef%26code_challenge%3D9Icudd-LqhVbS-vZmKuDuy6Zc5XKRYdkujGhr8eME98%26code_challenge_method%3DS256%26response_mode%3Dquery",
  ),
  [MainRoutes.CONSENT]: new URL(
    "https://localhost:2001/consent?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Didentity_admin_client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520OrdersApi%26state%3D1ab3f35d50614ed69c2069c6fe0edfb2%26code_challenge%3D03kEtAU-STTs9ubvf_xAhmxptgqx_vezSXxdfwh6PV4%26code_challenge_method%3DS256%26response_mode%3Dquery",
  ),
  [MainRoutes.FORGOT_PASSWORD]: new URL(
    "https://localhost:2001/account/forgotPassword?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Didentity_admin_client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520OrdersApi%26state%3D38ae80c9c0e14aa8bed2bf73c386b75a%26code_challenge%3DPc24-ZXdwUej0D0uXg5ZIiUjeDgHcfD6TqoeNmLQcSM%26code_challenge_method%3DS256%26response_mode%3Dquery",
  ),
  [MainRoutes.RESET_PASSWORD]: new URL(
    "https://localhost:2001/Account/ResetPassword?userId=afef2625-a7f4-4b39-a676-e904811b1636&token=CfDJ8KXXYOi%2bp5RIqg8WX1mNxHhgvBbaF%2fVadiIpmYcw4oxG1%2bO%2fSntOWhJY21oa%2b5tKifJ1blT%2bRY0Kl6eT06T62LOHwX3P%2bi5RL1KOUhXqVcjKc13BZgtEY%2fe28tZLZkAjmiyi0fkPonrPIs71xH4tCTOQZK1CJmSELqDL%2fKIszM9d5n%2fHH20Lcbs7Mugl8XIBpob2o7uwcWzMkenCIkUJcblCY3yObPWipqeXCR0qD5aC&returnUrl=%2fconnect%2fauthorize%2fcallback%3fclient_id%3didentity_admin_client%26redirect_uri%3dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3dcode%26scope%3dopenid%2520profile%2520OrdersApi%26state%3d38ae80c9c0e14aa8bed2bf73c386b75a%26code_challenge%3dPc24-ZXdwUej0D0uXg5ZIiUjeDgHcfD6TqoeNmLQcSM%26code_challenge_method%3dS256%26response_mode%3dquery",
  ),
};

export default {
  title: "PAGES/Main",
  component: Main,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
  decorators: [withRouter, withQueryProvider],
} as Meta;

const Template: Story<MainProps> = (args) => {
  const navigate = useNavigate();

  const handleClick = (pathname: MainRoutes) => () => {
    const { search } = searchParams[pathname];

    navigate({ pathname, search });
  };

  return (
    <div className={css.Story}>
      <div className={css.buttonContainer}>
        <Button
          className={css.storyButton}
          onClick={handleClick(MainRoutes.LOGIN)}
        >
          Login
        </Button>
        <Button
          className={css.storyButton}
          onClick={handleClick(MainRoutes.REGISTER)}
        >
          Register
        </Button>
        <Button
          className={css.storyButton}
          onClick={handleClick(MainRoutes.CONSENT)}
        >
          Consent
        </Button>
        <Button
          className={css.storyButton}
          onClick={handleClick(MainRoutes.FORGOT_PASSWORD)}
        >
          Forgot Password
        </Button>
        <Button
          className={css.storyButton}
          onClick={handleClick(MainRoutes.RESET_PASSWORD)}
        >
          Reset Password
        </Button>
      </div>
      <Main {...args} />
    </div>
  );
};

const Default = Template.bind({});

Default.args = {};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
