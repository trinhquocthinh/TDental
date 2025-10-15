import Link from 'next/link';

import { contactChannels } from '@/data/contact';

const iconClassName = 'contact-icon';

const iconMap = {
  'call-outline': 'tel',
  'mail-outline': 'mail',
  'time-outline': 'time',
} as const;

type IonIconName = keyof typeof iconMap;

type ContactChannelsProps = {
  className?: string;
};

export function ContactChannels({ className }: ContactChannelsProps) {
  return (
    <ul className={className}>
      {contactChannels.map(channel => {
        const isLink = Boolean(channel.href);
        const iconName = channel.icon as IonIconName;

        return (
          <li key={channel.id}>
            <span
              className={iconClassName}
              data-icon={iconMap[iconName]}
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
