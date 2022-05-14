import { Meta } from "@storybook/react";
import React, { useRef } from "react";

import Heading from "components/Heading";
import Text from "components/Text";

import { Portal } from "./Portal";
import css from "./Story.module.scss";

export default {
  title: "UI/Portal",
  component: Portal,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const children = (
  <Text>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus
    veniam, veritatis? A adipisci, alias amet beatae cupiditate dolor doloribus
    eos esse facere, illum in inventore ipsa itaque laborum magnam nam omnis
    optio perferendis praesentium quasi recusandae repellendus repudiandae
    similique soluta sunt ullam vitae voluptate! Alias enim exercitationem
    molestiae? Cupiditate earum expedita illum, ipsum iste minus odit provident
    voluptas! Assumenda commodi consequuntur culpa cumque doloremque eum
    laudantium nisi quidem quis rem sapiente sunt, suscipit temporibus, totam ut
    velit voluptate voluptatem. Assumenda doloribus expedita facilis impedit
    laborum natus quidem temporibus voluptatibus? Aliquid dolor earum eius
    excepturi expedita omnis porro provident quibusdam soluta!
  </Text>
);

const ReplaceHtml = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className={css.Story}>
      <div ref={ref}>
        <Heading variant="h3">
          This block will be replaced by Portal's children
        </Heading>
      </div>
      <div>
        <Heading variant="h3">Simple block</Heading>
        <Portal container={ref}>{children}</Portal>
      </div>
    </div>
  );
};

const NoReplaceHtml = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className={css.Story}>
      <div ref={ref}>
        <Heading variant="h3">This block will stay after Portal render</Heading>
      </div>
      <div>
        <Heading variant="h3">Simple block</Heading>
        <Portal replaceHtml={false} container={ref}>
          {children}
        </Portal>
      </div>
    </div>
  );
};

ReplaceHtml.parameters = {
  docs: {
    storyDescription: "Story description",
  },
};

export { ReplaceHtml, NoReplaceHtml };
