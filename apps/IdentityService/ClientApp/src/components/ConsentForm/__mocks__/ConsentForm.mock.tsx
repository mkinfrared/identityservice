import { ConsentFormProps } from "../ConsentForm.type";

// https://localhost:2001/consent?returnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3Didentity_admin_client%26redirect_uri%3Dhttps%253A%252F%252Flocalhost%253A4001%252Fsignin-callback.html%26response_type%3Dcode%26scope%3Dopenid%2520profile%2520OrdersApi%26state%3D80ca039f3d9545ffaf5164c8c077b3ba%26code_challenge%3D0vAESAEb1-lHzpScqjM8lg5bnVABfqCgX4plGDJlTyY%26code_challenge_method%3DS256%26response_mode%3Dquery

const ConsentFormMock = (props: ConsentFormProps) => (
  <div data-testid="ConsentForm">{JSON.stringify(props)}</div>
);

export default ConsentFormMock;
