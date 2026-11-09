import ShopDialog from "../ShopDialog.jsx";

export default function Header({
  menuOpen,
  setMenuOpen,
  shopRef,
  scent,
  size,
  price,
}) {
  return (
    <header>
      <a className="logo" href="#" aria-label="ELUNE 처음으로">
        ELUNE<span>A SOFT PRESENCE, A LASTING SCENT.</span>
      </a>
      <nav
        aria-label="메인 메뉴"
        className={menuOpen ? "open" : ""}
        onClick={(event) => {
          if (event.target.closest("a")) setMenuOpen(false);
        }}
      >
        <a href="#story">Our story</a>
        <a href="#scent">The scent</a>
        <a href="#ritual">Your ritual</a>
      </nav>
      <a className="header-cta" href="#fragrances">
        컬렉션 보기 <span>↗</span>
      </a>
      <ShopDialog
        ref={shopRef}
        selectedProduct={scent}
        size={size}
        price={price}
      />
      <button
        className="menu"
        aria-label="메뉴 열기"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "×" : "☰"}
      </button>
    </header>
  );
}
