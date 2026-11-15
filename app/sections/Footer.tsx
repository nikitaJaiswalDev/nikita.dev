import content from '../../content.json';

export default function Footer() {
  const { personal } = content;
  const links = [
    { label: 'LinkedIn', href: personal.linkedin },
    { label: 'GitHub', href: personal.github },
    { label: 'Email', href: `mailto:${personal.email}` },
  ];

  return (
    <footer className="border-t border-line px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 text-sm text-faint sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {personal.name}
        </p>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
