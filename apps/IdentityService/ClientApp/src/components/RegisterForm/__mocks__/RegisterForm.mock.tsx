import { RegisterFormProps } from "../RegisterForm.type";

const RegisterFormMock = (props: RegisterFormProps) => (
  <div data-testid="RegisterForm">{JSON.stringify(props)}</div>
);

// https://localhost:2001/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Dspa_client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520OrdersApi%26state%3D65f6fb0ccdb7484386e88d4d63060e6a%26code_challenge%3DwKv2XimlxGVNWFiqM1b-buR3DA3FrZmJdoXcPsDGduY%26code_challenge_method%3DS256%26response_mode%3Dquery

export default RegisterFormMock;
