import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Story from "./components/Story.jsx";
import FragranceCollection from "./components/FragranceCollection.jsx";
import ScentNotes from "./components/ScentNotes.jsx";
import DailyRitual from "./components/DailyRitual.jsx";
import ProductDetail from "./components/ProductDetail.jsx";
import ScentFilms from "./components/ScentFilms.jsx";
import ChapterNavigation from "./components/ChapterNavigation.jsx";
import Footer from "./components/Footer.jsx";
import {
  captions,
  catalog,
  chapters,
  filmFiles,
  prices,
  productImages,
} from "./data/fragrances.js";

export default function App() {
  const base = import.meta.env.BASE_URL;
  const shopRef = useRef(null);
  const [selected, setSelected] = useState("morningDew");
  const [activeNote, setActiveNote] = useState("top");
  const [size, setSize] = useState("30");
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

  useEffect(() => {
    const updateChapter = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
      let active = 0;

      chapters.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element && element.getBoundingClientRect().top <= headerHeight + 30) {
          active = index;
        }
      });

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 5;
      setCurrentChapter(atBottom ? chapters.length - 1 : active);
    };

    updateChapter();
    window.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("resize", updateChapter);
    return () => {
      window.removeEventListener("scroll", updateChapter);
      window.removeEventListener("resize", updateChapter);
    };
  }, []);

  const moveChapter = (direction) => {
    const next = Math.max(
      0,
      Math.min(chapters.length - 1, currentChapter + direction),
    );
    const target = document.querySelector(chapters[next]);
    if (!target) return;

    const headerHeight = document.querySelector("header")?.offsetHeight ?? 0;
    const top =
      next === 0
        ? 0
        : window.scrollY + target.getBoundingClientRect().top - headerHeight - 12;
    window.scrollTo({
      top,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  const selectScent = (key) => {
    setSelected(key);
    setActiveNote("top");
  };

  const scent = catalog[selected];
  const filmName = filmFiles[selected];
  const productImage =
    productImages[selected]?.[size] ??
    productImages[selected]?.["50"] ??
    productImages.morningDew["50"];

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} shopRef={shopRef} scent={scent} size={size} price={prices[size]} />
      <main>
        <Hero base={base} />
        <Story />
        <FragranceCollection base={base} catalog={catalog} productImages={productImages} selected={selected} scent={scent} selectScent={selectScent} />
        <ScentNotes scent={scent} activeNote={activeNote} setActiveNote={setActiveNote} />
        <DailyRitual />
        <ProductDetail base={base} catalog={catalog} selected={selected} scent={scent} size={size} setSize={setSize} productImage={productImage} price={prices[size]} selectScent={selectScent} onPurchase={() => shopRef.current?.openCheckout()} />
        <ScentFilms base={base} captions={captions} selected={selected} scent={scent} filmName={filmName} selectScent={selectScent} />
        <section className="closing"><p className="eyebrow">A SOFT PRESENCE, EVERY DAY</p><h2>일상에 스며들어, 오래 남는 향.</h2></section>
      </main>
      <ChapterNavigation currentChapter={currentChapter} chapterCount={chapters.length} moveChapter={moveChapter} />
      <Footer />
    </>
  );
}
