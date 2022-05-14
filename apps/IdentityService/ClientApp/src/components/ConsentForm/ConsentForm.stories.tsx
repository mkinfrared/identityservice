import { Meta, Story } from "@storybook/react";

import { consentReadDtoMock } from "api/queries/getConsent/__mocks__";
import { withQueryProvider } from "utils/storybookDecorators";

import { ConsentForm } from "./ConsentForm";
import { ConsentFormProps } from "./ConsentForm.type";
import css from "./Story.module.scss";

export default {
  title: "COMPONENTS/ConsentForm",
  component: ConsentForm,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
  decorators: [withQueryProvider],
} as Meta;

const Template: Story<ConsentFormProps> = (args) => (
  <div className={css.Story}>
    <ConsentForm {...args} />
  </div>
);

const Default = Template.bind({});

Default.args = {
  defaultValues: {
    rememberConsent: false,
    apiScopes: consentReadDtoMock.apiScopes.map((scope) => ({
      ...scope,
      description: scope.description ?? "",
      isPermitted: !!scope.required,
    })),
    identityScopes: consentReadDtoMock.identityScopes.map((scope) => ({
      ...scope,
      description: scope.description ?? "",
      isPermitted: false,
    })),
    description: "",
    permissionGranted: false,
    redirectUrl: "/foo/bar",
  },
  clientName: "foobar",
};

Default.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { Default };
