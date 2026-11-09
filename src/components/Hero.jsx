import { useEffect, useState } from "react";
import { productImages } from "../data/fragrances.js";

const slides = [
  {
    name: "MORNING DEW",
    slogan: "A CLEAR START TO YOUR DAY.",
    image: productImages.morningDew[50],
  },
  {
    name: "WHITE LINEN",
    slogan: "A SOFT TOUCH OF COMFORT.",
    image: productImages.whiteLinen[50],
  },
  {
    name: "QUIET BLOOM",
    slogan: "A GENTLE BLOOM, QUIETLY FELT.",
    image: productImages.quietBloom[50],
  },
  {
    name: "SANDAL HAZE",
    slogan: "A WARMTH THAT LINGERS.",
    image: productImages.sandalHaze[50],
  },
];

export default function Hero({ base }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [timerVersion, setTimerVersion] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [timerVersion]);

  const showSlide = (index) => {
    setActiveIndex(index);
    setTimerVersion((version) => version + 1);
  };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">SOFT · PURE · CALM · AIRY · SCENT</p>
          <h1>
            A soft presence,
            <br />
            <em>a lasting scent.</em>
          </h1>
          <p className="hero-korean">
            은은한 존재감,
            <br />
            오래도록 남는 향.
          </p>
          <p className="description">
            피부와 일상에 자연스럽게 스며드는 부드러운 향.
            <br />네 가지 향으로 매일의 공기를 섬세하게 채웁니다.
          </p>
          <a className="button" href="#fragrances">
            컬렉션 살펴보기 <span>↗</span>
          </a>
        </div>
        <div className="hero-visual">
          {slides.map((slide, index) => (
            <img
              key={slide.name}
              className={`hero-slide ${activeIndex === index ? "is-active" : ""}`}
              src={`${base}images/${slide.image}`}
              alt={`ELUNE ${slide.name} 오 드 퍼퓸 50 mL`}
              aria-hidden={activeIndex !== index}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          ))}
          {slides.map((slide, index) => (
            <span
              key={slide.slogan}
              className={`image-tag hero-caption ${activeIndex === index ? "is-active" : ""}`}
              aria-hidden={activeIndex !== index}
            >
              {slide.name}
              <br />
              <small>{slide.slogan}</small>
            </span>
          ))}
          <div className="hero-indicators" role="group" aria-label="Hero 향수 슬라이드 선택">
            {slides.map((slide, index) => (
              <button
                key={slide.name}
                type="button"
                className="hero-indicator"
                aria-label={`${slide.name} 슬라이드 보기`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => showSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
      <div className="scent-strip">
        <span>MORNING DEW</span>
        <i aria-hidden="true">/</i>
        <span>WHITE LINEN</span>
        <i aria-hidden="true">/</i>
        <span>SOFT PRESENCE</span>
        <i aria-hidden="true">/</i>
        <span>LASTING SCENT</span>
        <i aria-hidden="true">/</i>
      </div>
    </>
  );
}
