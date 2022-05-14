import { Meta, Story } from "@storybook/react";
import React, { useRef } from "react";

import Text from "components/Text";

import { Loading } from "./Loading";
import { LoadingProps } from "./Loading.type";
import css from "./Story.module.scss";

export default {
  title: "UI/Loading",
  component: Loading,
  parameters: {
    componentSubtitle: "Subtitle goes here",
  },
} as Meta;

const Template: Story<LoadingProps> = (args) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className={css.Story}>
      <div>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur
          dolore, ducimus fugit magnam natus nisi nobis possimus suscipit.
          Accusantium aliquam aspernatur atque excepturi facilis illo, ipsa
          natus nihil quos repellat?
        </Text>
      </div>
      <div ref={ref} className={css.loadingContainer}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
          aliquid asperiores deserunt dignissimos illo, illum libero maxime
          minima nemo omnis perferendis placeat provident quo, ratione sequi
          sint veritatis voluptas voluptatum. Culpa illum inventore ipsam
          laudantium libero quam quas! Accusamus blanditiis consectetur deleniti
          dolorem doloremque enim explicabo fuga illo ipsum iure, iusto
          molestias nam nisi officiis porro quas, quia ratione recusandae saepe
          soluta tenetur ullam veniam vero. Accusantium autem cupiditate
          ducimus, eos hic iure laborum, nostrum quidem quo sapiente similique
          tempore ullam voluptatum? A dicta, dolore dolorum ea eius eos error
          exercitationem facilis fugiat fugit inventore itaque labore laudantium
          minus modi nam natus nulla porro qui quibusdam quo recusandae sit ut
          voluptatibus voluptatum. Aperiam, atque, ea eius enim et expedita fuga
          incidunt iste iure nostrum nulla quam quis ratione repudiandae,
          veniam? Ad aliquam atque commodi dolorum error, eum impedit itaque
          nesciunt quia quos, rem totam unde vero. Ab aliquid dignissimos quam
          sed voluptates? Ab asperiores assumenda commodi corporis, culpa ea
          eligendi et eveniet exercitationem expedita facere fugit hic impedit
          iste maiores minus molestiae necessitatibus nesciunt, nobis obcaecati
          officia officiis, pariatur porro qui quo repellat unde ut velit veniam
          voluptatem! Accusantium adipisci alias aliquam beatae cupiditate
          dolor, dolores illo itaque iure nihil nostrum obcaecati officiis
          optio, porro possimus, praesentium recusandae reiciendis rem
          reprehenderit voluptate. A atque cupiditate earum explicabo ipsum
          maiores minima quas sed ut. Alias distinctio eligendi enim
          exercitationem facere officiis pariatur quaerat suscipit vel velit. Ad
          adipisci alias consectetur consequatur dolor eos et excepturi fugiat
          id illum ipsum iure magni maxime, mollitia necessitatibus neque, nisi
          optio provident qui, quod rem sint sunt tempore. Atque esse id
          nostrum, quidem sapiente sit veritatis? A aperiam at dolor doloremque
          dolores doloribus eaque earum enim error facere minus neque nulla
          officiis perspiciatis quasi quis reiciendis reprehenderit rerum saepe
          sapiente sed, sequi sunt temporibus ullam voluptas. Aperiam debitis
          distinctio, doloremque eaque, error esse fuga impedit incidunt laborum
          libero, maiores mollitia natus omnis possimus quae qui quod quos sequi
          suscipit tempore. Ad amet ducimus nulla officiis omnis perferendis
          voluptates. Accusamus cum doloremque eaque et, laborum magni natus
          obcaecati perferendis sequi sit unde voluptatum. Ab amet animi,
          asperiores atque blanditiis corporis, cum dolorem enim expedita fuga
          fugiat illum itaque maiores molestias nulla pariatur quisquam
          recusandae repellat rerum similique temporibus vero voluptates
          voluptatum. Ab at atque autem corporis necessitatibus numquam placeat
          provident quas quidem voluptas. Animi, at aut blanditiis doloremque ea
          eaque enim eveniet explicabo facilis fugit inventore ipsam iure
          laboriosam maxime nihil perspiciatis quia quis reiciendis rem
          temporibus, ut voluptas voluptatem voluptates. Atque consectetur
          deserunt saepe. Amet, architecto at atque doloribus ea eius maxime
          nostrum repellendus sapiente sint sit tempora. Dolor iusto maiores
          molestias non perspiciatis tempora, ut voluptas. In incidunt inventore
          ipsa omnis. Blanditiis eos eveniet ipsa iusto officia quas quasi
          rerum? A accusamus architecto asperiores autem beatae cumque, deleniti
          dolorem eaque excepturi facere fugiat, id incidunt laudantium maiores
          necessitatibus nostrum odio officia placeat praesentium provident
          quaerat quod quos saepe suscipit vero voluptatem voluptates
          voluptatum. Architecto commodi dolorem ducimus est facere quaerat
          repellendus sint unde voluptatibus!
        </Text>
      </div>
      <Loading {...args} />
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
