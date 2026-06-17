/*
  --- COMPONENT: Header ---
  A React component is a reusable piece of UI.
  Each component is a function that returns JSX (HTML-like syntax).
  Components are named with a capital letter (Header, not header).
*/

function Header() {
  return (
    // JSX looks like HTML but lives inside JavaScript.
    // It gets converted to real HTML by React.
    <header className="site-header">
      <div className="container header-brand">
        <img src="/images/better-choices-logo.png" alt="Better Choices logo" className="logo-img" />
        <h1 className="logo">Better Choices</h1>
      </div>
    </header>
  );
}

export default Header;
