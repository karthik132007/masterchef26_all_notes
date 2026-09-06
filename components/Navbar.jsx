import Link from "next/link";

export default function Navbar({ links }) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link className="logo" href="/">
          <span className="logo-mark">m</span>
          <span className="logo-text">
            <b>masterchef26</b>
            <span>class notes · by students</span>
          </span>
        </Link>
        <div className="nav-links">
          {links?.map((l) => (
            <Link key={l.href} className="hide-m" href={l.href}>
              {l.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/#courses">
            ← all subjects
          </Link>
        </div>
      </div>
    </nav>
  );
}
