import "../css/header.css";

export function Header(): JSX.Element {
  return (
    <>
      <header>
        <div className="header-content">
          <a href="#">Home</a>
          <a href="#">Character</a>
          <a href="#">Guild</a>
          <a href="#">Top 100</a>
        </div>
      </header>
    </>
  );
}