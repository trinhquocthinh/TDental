import Link from 'next/link';

import { contactChannels } from '@/data/contact';

const iconClassName = 'contact-icon';

type ContactChannelsProps = {
  className?: string;
};

export function ContactChannels({ className }: ContactChannelsProps) {
  return (
    <ul className={className}>
      {contactChannels.map(channel => {
        const isLink = Boolean(channel.href);

        return (
          <li key={channel.id}>
            <ion-icon
              name={channel.icon}
              class={iconClassName}
              aria-hidden="true"
            />
            {isLink ? (
              <Link href={channel.href ?? '#'}>{channel.text}</Link>
            ) : (
              <span>{channel.text}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
