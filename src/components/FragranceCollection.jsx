const cardCopy = {
  morningDew: [
    "01",
    "Fresh Floral · 상쾌한 아침",
    "꽃잎에 맺힌 이슬처럼 맑고 산뜻한 향",
  ],
  whiteLinen: [
    "02",
    "Clean Musk · 여유로운 낮",
    "햇살에 말린 하얀 침구처럼 포근한 향",
  ],
  quietBloom: [
    "03",
    "Soft Floral · 부드러운 오후",
    "고요한 정원에서 천천히 피어나는 꽃향",
  ],
  sandalHaze: [
    "04",
    "Soft Woody · 고요한 저녁",
    "해 질 무렵의 깊고 따뜻한 나무 향",
  ],
};

export default function FragranceCollection({
  base,
  catalog,
  productImages,
  selected,
  scent,
  selectScent,
}) {
  return (
    <section id="fragrances" className="section fragrance-section">
      <h2>
        Four scents.
        <br />
        <em>Room to breathe.</em>
      </h2>
      <p className="fragrance-intro">
        기분에 맞는 향을 골라보세요. 아래에서 선택한 향의 노트와 상품 정보를
        확인할 수 있어요.
      </p>
      <div className="fragrance-grid">
        {Object.entries(catalog).map(([key, item]) => {
          const [index, family, summary] = cardCopy[key];
          return (
            <button
              key={key}
              className="fragrance-card"
              data-fragrance={key}
              onClick={() => selectScent(key)}
              aria-pressed={selected === key}
            >
              <img
                src={`${base}images/${productImages[key][50]}`}
                alt=""
                loading="lazy"
              />
              <span className="fragrance-copy">
                <span className="fragrance-index">
                  {index}
                  <span
                    className="fragrance-indicator"
                    aria-hidden="true"
                  ></span>
                </span>
                <strong>{item.name}</strong>
                <span className="fragrance-ko">{item.ko}</span>
                <span className="fragrance-family">{family}</span>
                <span className="fragrance-summary">{summary}</span>
              </span>
            </button>
          );
        })}
      </div>
      <p id="fragrance-status" aria-live="polite">
        선택한 향 · {scent.ko}
      </p>
      <a className="fragrance-link" href="#scent">
        선택한 향의 노트 보기 ↓
      </a>
    </section>
  );
}
