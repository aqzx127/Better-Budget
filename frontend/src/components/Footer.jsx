import { Group, ActionIcon, rem, Breadcrumbs } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram, IconPigMoney } from '@tabler/icons-react';
import classes from '../css-modules/FooterCentered.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const links = [
  { link: '/privacy', label: 'Privacy' },
  { link: '/faq', label: 'FAQ' },
  { link: '/contact-us', label: 'Contact' },
];

function Footer() {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/');
  }

  const breadcrumbItems = links.map((link) => (
    <Link
      to={link.link}
      c="dimmed"
      key={link.label}
      href={link.link}
      size="sm"
    >
      {link.label}
    </Link>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <IconPigMoney className="cursor-pointer" onClick={redirectHome}/>
        <Breadcrumbs separator="|" className={classes.links}>
          {breadcrumbItems}
        </Breadcrumbs>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}

export default Footer;
