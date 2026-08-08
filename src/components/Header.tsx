"use client";

function goForm() {
  document.getElementById("form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => {
    const el = document.getElementById("email");
    if (el instanceof HTMLElement && el.offsetParent !== null) el.focus();
  }, 500);
}

export default function Header() {
  return (
    <header>
      <div className="wrap nav">
        <a href="#" className="logo">
          <span className="logo-mark"></span>Le&nbsp;Bon&nbsp;Métré
        </a>
        <nav className="nav-links">
          <a href="#probleme">Le problème</a>
          <a href="#solution">Comment ça marche</a>
          <a href="#alpha">L&apos;alpha</a>
          <a href="#faq">Questions</a>
        </nav>
        <div className="nav-right">
          <button className="nav-cta" onClick={goForm}>
            Réserver ma place
          </button>
        </div>
      </div>
    </header>
  );
}
