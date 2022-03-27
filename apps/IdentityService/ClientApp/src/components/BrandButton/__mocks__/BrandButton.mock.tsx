import { BrandButtonProps } from "../BrandButton.type";

const BrandButtonMock = (props: BrandButtonProps) => (
  <div data-testid="BrandButton">{JSON.stringify(props)}</div>
);

export default BrandButtonMock;
