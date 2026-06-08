import { noop } from '@melio/penny-utils';
import { type Meta, type StoryObj } from '@storybook/react-vite';
import { Storybook } from 'storybook-utils';

import { FileAttachment } from './FileAttachment';

const errorFileUrl =
  'https://static-cert.getbills.com/static_imp/billdetail/bill8.html?CFIDREL=E6-10p5nsnp-76905-5555555858556-rmKbplritko2kE7Z52LLf9ERP-G06lTCr%2By85EQqPxStIsIff7%2F6zDaR%2FZh6YZIIFEGfW0L1HcrrIuoYpE8KZY7YifcmHsNCk2a1k7byK%2BT2dtCNZbaG%2FKakXQ7Q12j6Qa6dxnlw2rjDMRWS9dYYuQYD9R6sqzsXuMfskmK5ej6rxGaHb04GL6S7yZJx8AHR%2FzOq%2BI6JRK6yIqOqdXgBIwPOcugFObcd9E48zJz1xoXFWMkpEhrqLL4dVWYkhxYD%2FBSXDVX9YrbCiUvxHty5oT2aDYSsQGAoimzRMPRE0wtJ%2BOEIOCKe8dOVL%2BTDa8mygRREa2ami5Peyd5x%2B272CmDrUXCGHXRzGF1xS0BsYU7rXmij%3D%3D&CFVOUCHER=I6-10p5nsnp-F-76905-rmKbplritko2kE7Z52LLf9ERP-T-Bt9RU8tsCB4n9FmrhWPCJD%3D%3D-Wi0dRTW7PZwTFmIyrNbg1OFi7d30I6nk5byxuQwtrqk7z0WJTw%2B3JgyfmN%2FvfrY5sZRWfg5XhpajxMbFklcabO0phRosC5u5BZibMd8kaRkj6YUz4vMoGicOgZcwGJdl3uLY86B3YvBevGYRG4EW9wyqC3Ccx97ykcwdAv7QvEP3UpBctNYhJ3l7Hac2Da%2BRzj0QKsLekC49SXM0jGhiY8k09iwDgPpCFpGsjvyXAMK9QJgVNFXchdWa%2BFCnbTfKNJQoIDHaDTNV5IGATgbY9M4%2BZDJTxt5FkbX8%2FKZZixUKejtXh3%2BjQfnZ%2B2ZWTP8hyUg64un3wadSsFcU6V0vcj%3D%3D';

const meta: Meta<typeof FileAttachment> = {
  title: 'Chromatic/File Attachment',
  component: FileAttachment,
  argTypes: {},
  args: {},
};
export default meta;

export const NoPreview: StoryObj<typeof FileAttachment> = {
  render: () => {
    const args = {
      value: errorFileUrl,
      onChange: noop,
      deleteButtonText: 'Delete File',
    };
    const items = [
      { label: 'Edit', component: <FileAttachment {...args} /> },
      { label: 'View mode', component: <FileAttachment {...args} isViewMode /> },
      { label: 'Read only', component: <FileAttachment {...args} isReadOnly /> },
      { label: 'Loading', component: <FileAttachment {...args} isLoading /> },
    ];
    return <Storybook.Row items={items} alignCompLabel="vertical" alignItems="flex-start" />;
  },
};
