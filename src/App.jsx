// 전체 코드: src/App.jsx
// 향수 카드·향 노트·용량·영상·모바일 메뉴를 React state로 연결했습니다.
// 로그인·회원가입·구매·주문조회는 별도 전환 단계입니다.
import { useRef, useState } from "react";
import ShopDialog from "./ShopDialog.jsx";

const note = (label, title, subtitle, desc, tags, word) => ({
  label,
  title,
  subtitle,
  desc,
  tags,
  word,
});
const catalog = {
  sunday: {
    name: "Morning Dew",
    ko: "모닝 듀",
    image: "morning-dew",
    family: "Fresh Floral",
    color: "#D5E6F0",
    mood: "깨끗함 · 상쾌함 · 맑은 아침 공기",
    time: "상쾌한 아침",
    description: "이른 아침, 꽃잎에 맺힌 이슬처럼 맑고 산뜻한 향.",
    keywords: "FRESH · FLORAL · CLEAR",
    notes: {
      top: note(
        "TOP NOTES",
        "Bergamot & Green Apple",
        "아침을 여는 투명한 산뜻함",
        "베르가모트의 맑은 시트러스 향과 그린 애플의 싱그러운 기운이 깨끗한 첫인상을 만듭니다.",
        ["깨끗함", "상쾌함", "아침"],
        "dew.",
      ),
      heart: note(
        "MIDDLE NOTES",
        "White Jasmine & Lily of the Valley",
        "이슬을 머금은 하얀 꽃잎",
        "화이트 재스민과 은방울꽃이 맑고 섬세하게 피어나 프레시 플로럴의 중심을 완성합니다.",
        ["화이트 플로럴", "맑은", "섬세한"],
        "bloom.",
      ),
      base: note(
        "BASE NOTES",
        "White Musk & Cedarwood",
        "깨끗하게 이어지는 잔잔한 여운",
        "화이트 머스크의 보드라움과 시더우드의 담백함이 피부 위에 깨끗한 아침 공기처럼 머뭅니다.",
        ["화이트 머스크", "잔잔한", "클린"],
        "musk.",
      ),
    },
  },
  citrus: {
    name: "White Linen",
    ko: "화이트 리넨",
    image: "white-linen",
    family: "Clean Musk",
    color: "#F1E9D8",
    mood: "보송함 · 편안함 · 갓 세탁한 침구",
    time: "여유로운 낮",
    description: "따스한 햇살 아래 바짝 말린 하얀 침구처럼 포근하고 부드러운 향.",
    keywords: "CLEAN · MUSK · COMFORT",
    notes: {
      top: note(
        "TOP NOTES",
        "Cotton & Aldehydes",
        "햇살에 말린 하얀 코튼",
        "깨끗한 코튼과 투명한 알데하이드가 갓 세탁한 리넨처럼 보송하고 산뜻하게 시작됩니다.",
        ["코튼", "보송한", "클린"],
        "linen.",
      ),
      heart: note(
        "MIDDLE NOTES",
        "Iris & White Rose",
        "부드럽게 포개지는 흰 꽃",
        "아이리스의 파우더리함과 화이트 로즈의 은은한 꽃향이 포근하고 정돈된 인상을 더합니다.",
        ["아이리스", "화이트 로즈", "편안한"],
        "cotton.",
      ),
      base: note(
        "BASE NOTES",
        "Soft Musk & Sandalwood",
        "살결 가까이 남는 포근함",
        "소프트 머스크와 샌달우드가 따스한 낮의 햇살처럼 부드럽고 편안한 여운을 남깁니다.",
        ["소프트 머스크", "포근한", "샌달우드"],
        "soft.",
      ),
    },
  },
  petal: {
    name: "Quiet Bloom",
    ko: "콰이어트 블룸",
    image: "quiet-bloom",
    family: "Soft Floral",
    color: "#EBC9C7",
    mood: "사랑스러움 · 차분함 · 은은한 꽃향기",
    time: "부드러운 오후",
    description: "고요한 정원에서 꽃이 천천히 피어나는 순간을 담은 은은하고 우아한 향.",
    keywords: "SOFT · FLORAL · GRACEFUL",
    notes: {
      top: note(
        "TOP NOTES",
        "Peony & Pink Pepper",
        "천천히 열리는 첫 꽃잎",
        "피오니의 수분감 있는 꽃향에 핑크 페퍼의 산뜻한 생기가 더해져 사랑스럽게 시작됩니다.",
        ["피오니", "사랑스러운", "은은한"],
        "petal.",
      ),
      heart: note(
        "MIDDLE NOTES",
        "Rose & Freesia",
        "고요한 정원에 번지는 꽃향기",
        "로즈와 프리지아가 섬세하게 포개지며 차분하고 우아한 소프트 플로럴을 표현합니다.",
        ["로즈", "프리지아", "우아한"],
        "rose.",
      ),
      base: note(
        "BASE NOTES",
        "Amber & White Musk",
        "따뜻하고 은은하게 남는 꽃의 기억",
        "앰버의 잔잔한 온기와 화이트 머스크가 오후의 꽃향을 부드럽게 감싸며 오래 머뭅니다.",
        ["앰버", "화이트 머스크", "차분한"],
        "amber.",
      ),
    },
  },
  rain: {
    name: "Sandal Haze",
    ko: "샌달 헤이즈",
    image: "sandal-haze",
    family: "Soft Woody",
    color: "#B89A81",
    mood: "따뜻함 · 차분함 · 깊은 휴식",
    time: "고요한 저녁",
    description: "해 질 무렵, 나무 향이 가득한 조용한 공간에서 느끼는 깊고 따뜻한 향.",
    keywords: "SOFT · WOODY · WARM",
    notes: {
      top: note(
        "TOP NOTES",
        "Cardamom & Bergamot",
        "해 질 무렵의 따뜻한 공기",
        "카다멈의 은은한 스파이스와 베르가모트의 밝은 기운이 조용하고 따뜻한 저녁을 엽니다.",
        ["카다멈", "따뜻한", "차분한"],
        "haze.",
      ),
      heart: note(
        "MIDDLE NOTES",
        "Sandalwood & Cedarwood",
        "고요한 공간을 채우는 나무 향",
        "크리미한 샌달우드와 담백한 시더우드가 어우러져 깊고 부드러운 우디 노트를 만듭니다.",
        ["샌달우드", "시더우드", "소프트 우디"],
        "wood.",
      ),
      base: note(
        "BASE NOTES",
        "Amber, Vanilla & Musk",
        "깊은 휴식처럼 포근한 마무리",
        "앰버와 바닐라의 온기를 머스크가 부드럽게 감싸며 고요한 저녁처럼 깊은 여운을 남깁니다.",
        ["앰버", "바닐라", "머스크"],
        "rest.",
      ),
    },
  },
};
const captions = {
  sunday: "이른 아침의 맑은 공기와 꽃잎 위 이슬이 산뜻하게 하루를 엽니다.",
  citrus: "따스한 낮의 햇살 아래, 깨끗한 리넨이 바람에 부드럽게 흔들립니다.",
  petal: "고요한 오후의 정원에서 꽃잎이 천천히 피어나 은은한 향을 전합니다.",
  rain: "해 질 무렵의 조용한 공간을 따뜻하고 깊은 나무 향이 채웁니다.",
};

const productImages = {
  sunday: { 30: "LENTO_Morning_Dew_30ML.png", 50: "LENTO_Morning_Dew_50ML.png" },
  citrus: { 30: "LENTO_White_Linen_30ML.png", 50: "LENTO_White_Linen_50ML.png" },
  petal: { 30: "LENTO_Quiet_Bloom30ML.png", 50: "LENTO_Quiet_Bloom50ML.png" },
  rain: { 30: "LENTO_Sandal_Haze_30ML.png", 50: "LENTO_Sandal_Haze_50ML.png" },
};

const filmFiles = {
  sunday: "sunday-still",
  citrus: "citrus-hour",
  petal: "petal-letter",
  rain: "after-rain",
};

export default function App() {
  const BASE = import.meta.env.BASE_URL;
  const shopRef = useRef(null);
  const [selected, setSelected] = useState("sunday");
  const [activeNote, setActiveNote] = useState("top");
  const [size, setSize] = useState("30");
  const [menuOpen, setMenuOpen] = useState(false);
  const scent = catalog[selected];
  const currentNote = scent.notes[activeNote];
  const filmName = filmFiles[selected];
  const productImage =
    productImages[selected]?.[size] ??
    productImages[selected]?.["50"] ??
    productImages.sunday["50"];
  const selectScent = (key) => {
    setSelected(key);
    setActiveNote("top");
  };
  const prices = { 30: 58000, 50: 82000 };

  return (
    <>
      <div className="announcement">
        ELUNE — DAILY NICHE PERFUME <span>은은한 존재감, 오래도록 남는 향</span>
      </div>
      <header>
        <a className="logo" href="#" aria-label="ELUNE 처음으로">
          ELUNE<span>A SOFT PRESENCE, A LASTING SCENT.</span>
        </a>
        <nav
          aria-label="메인 메뉴"
          className={menuOpen ? "open" : ""}
          onClick={(e) => {
            if (e.target.closest("a")) setMenuOpen(false);
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
          price={prices[size]}
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
      <main>
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
            <div className="hero-bottom">
              <span>01 — EAU DE PARFUM</span>
              <a href="#story">SCROLL TO DISCOVER ↓</a>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src={`${BASE}images/${productImages.sunday[50]}`}
              alt="맑은 아침빛 속 ELUNE 모닝 듀 오 드 퍼퓸 50 mL"
              fetchPriority="high"
            />
            <span className="image-tag">
              MORNING DEW
              <br />
              <small>A CLEAR START TO YOUR DAY.</small>
            </span>
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
        <section id="story" className="story section">
          <div className="section-number">01 / OUR PHILOSOPHY</div>
          <div className="story-main">
            <p className="eyebrow">A SOFT PRESENCE, HELD IN SCENT.</p>
            <h2>
              일상에 스며들어,
              <br />
              오래 남는 <em>부드러운 향.</em>
            </h2>
            <div className="story-text">
              <p>
                창문 사이로 들어오는 햇살, 깨끗한 패브릭의 감촉,
                <br />
                피부 가까이 은은하게 머무는 향.
              </p>
              <p>
                ELUNE은 일상에 자연스럽게 스며드는 향에서 시작합니다.
                <br />
                덜어낸 형태, 섬세하게 겹치는 향, 그리고 오래 남는 잔향.
                <br />
                매일의 익숙한 순간에 포근하고 조용한 존재감을 더합니다.
              </p>
            </div>
            <span className="signature">Softly present, quietly lasting.</span>
          </div>
          <div className="story-aside">
            <p>
              Softly here.
              <br />
              Still remembered.
            </p>
            <small>ELUNE / DAILY NICHE PERFUME</small>
          </div>
        </section>
        <section id="fragrances" className="section fragrance-section">
          <p className="eyebrow">02 / THE COLLECTION</p>
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
            <button
              className="fragrance-card"
              data-fragrance="sunday"
              onClick={() => selectScent("sunday")}
              aria-pressed={selected === "sunday"}
            >
              <img src={`${BASE}images/${productImages.sunday[50]}`} alt="" loading="lazy" />
              <span className="fragrance-copy">
                <span className="fragrance-index">
                  01{" "}
                  <span
                    className="fragrance-indicator"
                    aria-hidden="true"
                  ></span>
                </span>
                <strong>Morning Dew</strong>
                <span className="fragrance-ko">모닝 듀</span>
                <span className="fragrance-family">Fresh Floral · 상쾌한 아침</span>
                <span className="fragrance-summary">꽃잎에 맺힌 이슬처럼 맑고 산뜻한 향</span>
              </span>
            </button>
            <button
              className="fragrance-card"
              data-fragrance="citrus"
              onClick={() => selectScent("citrus")}
              aria-pressed={selected === "citrus"}
            >
              <img
                src={`${BASE}images/${productImages.citrus[50]}`}
                alt=""
                loading="lazy"
              />
              <span className="fragrance-copy">
                <span className="fragrance-index">
                  02{" "}
                  <span
                    className="fragrance-indicator"
                    aria-hidden="true"
                  ></span>
                </span>
                <strong>White Linen</strong>
                <span className="fragrance-ko">화이트 리넨</span>
                <span className="fragrance-family">Clean Musk · 여유로운 낮</span>
                <span className="fragrance-summary">햇살에 말린 하얀 침구처럼 포근한 향</span>
              </span>
            </button>
            <button
              className="fragrance-card"
              data-fragrance="petal"
              onClick={() => selectScent("petal")}
              aria-pressed={selected === "petal"}
            >
              <img
                src={`${BASE}images/${productImages.petal[50]}`}
                alt=""
                loading="lazy"
              />
              <span className="fragrance-copy">
                <span className="fragrance-index">
                  03{" "}
                  <span
                    className="fragrance-indicator"
                    aria-hidden="true"
                  ></span>
                </span>
                <strong>Quiet Bloom</strong>
                <span className="fragrance-ko">콰이어트 블룸</span>
                <span className="fragrance-family">Soft Floral · 부드러운 오후</span>
                <span className="fragrance-summary">고요한 정원에서 천천히 피어나는 꽃향</span>
              </span>
            </button>
            <button
              className="fragrance-card"
              data-fragrance="rain"
              onClick={() => selectScent("rain")}
              aria-pressed={selected === "rain"}
            >
              <img
                src={`${BASE}images/${productImages.rain[50]}`}
                alt=""
                loading="lazy"
              />
              <span className="fragrance-copy">
                <span className="fragrance-index">
                  04{" "}
                  <span
                    className="fragrance-indicator"
                    aria-hidden="true"
                  ></span>
                </span>
                <strong>Sandal Haze</strong>
                <span className="fragrance-ko">샌달 헤이즈</span>
                <span className="fragrance-family">Soft Woody · 고요한 저녁</span>
                <span className="fragrance-summary">해 질 무렵의 깊고 따뜻한 나무 향</span>
              </span>
            </button>
          </div>
          <p id="fragrance-status" aria-live="polite">
            선택한 향 · {scent.ko}
          </p>
          <a className="fragrance-link" href="#scent">
            선택한 향의 노트 보기 ↓
          </a>
        </section>
        <section id="scent" className="scent section">
          <div className="section-top">
            <div>
              <p className="eyebrow">03 / THE SCENT</p>
              <h2>
                한 번의 향, <em>세 번의 만남.</em>
              </h2>
            </div>
            <p>
              처음의 싱그러움부터 마지막의 포근함까지.
              <br />
              시간이 흐르며 달라지는 향의 표정을 느껴보세요.
            </p>
          </div>
          <div className="notes-layout">
            <div className="note-art" aria-hidden="true">
              <div className="orbit orbit-a"></div>
              <div className="orbit orbit-b"></div>
              <div className="orbit orbit-c"></div>
              <span className="art-word">
                {currentNote.word}
                <small>{scent.keywords}</small>
              </span>
              <span className="orbit-dot"></span>
            </div>
            <div className="note-content">
              <div className="note-tabs" role="tablist" aria-label="향의 단계">
                <button
                  id="tab-top"
                  role="tab"
                  aria-controls="note-panel"
                  aria-selected={activeNote === "top"}
                  data-note="top"
                  onClick={() => setActiveNote("top")}
                  tabIndex={activeNote === "top" ? 0 : -1}
                >
                  01 TOP
                </button>
                <button
                  id="tab-heart"
                  role="tab"
                  aria-controls="note-panel"
                  aria-selected={activeNote === "heart"}
                  data-note="heart"
                  onClick={() => setActiveNote("heart")}
                  tabIndex={activeNote === "heart" ? 0 : -1}
                >
                  02 MIDDLE
                </button>
                <button
                  id="tab-base"
                  role="tab"
                  aria-controls="note-panel"
                  aria-selected={activeNote === "base"}
                  data-note="base"
                  onClick={() => setActiveNote("base")}
                  tabIndex={activeNote === "base" ? 0 : -1}
                >
                  03 BASE
                </button>
              </div>
              <div
                id="note-panel"
                role="tabpanel"
                aria-labelledby={`tab-${activeNote}`}
                tabIndex="0"
              >
                <p className="note-label">{currentNote.label}</p>
                <h3>{currentNote.title}</h3>
                <h4>{currentNote.subtitle}</h4>
                <p className="note-desc">{currentNote.desc}</p>
                <div className="note-tags">
                  {currentNote.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
              <p className="note-hint">
                각 노트를 눌러 향의 변화를 살펴보세요 ↗
              </p>
            </div>
          </div>
        </section>
        <section className="quote">
          <p>A quiet kind of presence.</p>
          <span>크게 드러내지 않아도, 오래 기억되는 존재감.</span>
        </section>
        <section id="ritual" className="ritual section">
          <div className="section-top">
            <div>
              <p className="eyebrow">04 / YOUR DAILY RITUAL</p>
              <h2>
                당신의 일상에 <em>스며드는 순간.</em>
              </h2>
            </div>
          </div>
          <div className="ritual-grid">
            <article>
              <span className="ritual-num">01</span>
              <div className="ritual-icon">☀</div>
              <p className="eyebrow">A FRESH MORNING</p>
              <h3>나를 위한 아침</h3>
              <p>
                외출 전 손목에 가볍게 한 번.
                <br />
                오늘의 시작을 나만의 향으로 채워보세요.
              </p>
            </article>
            <article>
              <span className="ritual-num">02</span>
              <div className="ritual-icon">⌁</div>
              <p className="eyebrow">A LITTLE BREAK</p>
              <h3>잠깐의 쉼표</h3>
              <p>
                바쁘게 흘러가는 오후, 익숙한 향에 집중하며
                <br />
                잠시 호흡을 고르는 시간을 가져보세요.
              </p>
            </article>
            <article>
              <span className="ritual-num">03</span>
              <div className="ritual-icon">☾</div>
              <p className="eyebrow">YOUR OWN EVENING</p>
              <h3>온전히 나의 저녁</h3>
              <p>
                좋아하는 음악과 읽다 만 책 한 권.
                <br />
                잔잔하게 남은 향과 함께 하루를 마무리해요.
              </p>
            </article>
          </div>
        </section>
        <section id="collection" className="collection">
          <div className="collection-image">
            <div className="collection-image-frame">
              <img
                src={`${BASE}images/${productImage}`}
                alt={`${scent.ko} 오 드 퍼퓸 ${size} mL 향수병`}
                loading="lazy"
              />
            </div>
            <span>ELUNE / SIGNATURE COLLECTION</span>
          </div>
          <div className="product">
            <p className="eyebrow">05 / FIND YOUR SIGNATURE SCENT</p>
            <div className="product-heading">
              <div>
                <h2>{scent.name}</h2>
                <p className="product-ko">{scent.ko} 오 드 퍼퓸</p>
              </div>
              <div className="scent-picker">
                <span className="scent-picker-label">OTHER SCENTS</span>
                <div className="scent-swatches" role="group" aria-label="다른 향수 보기">
                  {Object.entries(catalog).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      className="scent-swatch"
                      style={{ "--scent-color": item.color }}
                      title={`${item.name} · ${item.ko}`}
                      aria-label={`${item.name} 향수 보기`}
                      aria-pressed={selected === key}
                      onClick={() => selectScent(key)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="product-description">{scent.description}</p>
            <dl className="product-profile">
              <div><dt>SCENT</dt><dd>{scent.family}</dd></div>
              <div><dt>MOOD</dt><dd>{scent.mood}</dd></div>
              <div><dt>TIME</dt><dd>{scent.time}</dd></div>
            </dl>
            <fieldset>
              <legend>
                SIZE <span>용량을 선택하세요</span>
              </legend>
              <button
                className={`size ${size === "30" ? "active" : ""}`}
                data-size="30"
                onClick={() => setSize("30")}
                aria-pressed={size === "30"}
              >
                30 mL
              </button>
              <button
                className={`size ${size === "50" ? "active" : ""}`}
                data-size="50"
                onClick={() => setSize("50")}
                aria-pressed={size === "50"}
              >
                50 mL
              </button>
            </fieldset>
            <div className="price-row">
              <span id="price">₩ {prices[size].toLocaleString("ko-KR")}</span>
              <small>포트폴리오용 예시 가격</small>
            </div>
            <button
              type="button"
              className="button product-button"
              onClick={() => shopRef.current?.openCheckout()}
            >
              구매하기 <span>↗</span>
            </button>
            <p className="demo-notice">
              가상의 브랜드를 소개하는 콘셉트 페이지입니다.
              <br />
              체험 주문은 이 브라우저에 저장되며 실제 결제는 진행되지 않습니다.
            </p>
            <details>
              <summary>
                상품 구성 안내 <span>+</span>
              </summary>
              <p>
                {scent.ko} 오 드 퍼퓸 선택 용량 1개와 패키지로 구성한 가상
                상품입니다. 상품명·향 구성·가격은 디자인을 위한 예시입니다.
              </p>
            </details>
            <details>
              <summary>
                향수 사용 및 보관 팁 <span>+</span>
              </summary>
              <p>
                눈과 점막을 피해 사용하고, 직사광선을 피해 보관하세요. 실제
                제품을 사용할 때는 해당 제품의 표시 사항을 확인하세요.
              </p>
            </details>
          </div>
        </section>
        <section
          id="scent-films"
          className="section scent-films"
          aria-labelledby="scent-films-title"
        >
          <div className="film-layout">
            <div className="film-copy">
              <p className="eyebrow">06 / SCENT FILMS</p>
              <h2 id="scent-films-title">
                향을 닮은 <em>네 가지 장면.</em>
              </h2>
              <p id="film-caption" aria-live="polite">
                {captions[selected]}
              </p>
              <div
                className="film-options"
                role="group"
                aria-label="향 영상 선택"
              >
                <button
                  type="button"
                  data-film="sunday"
                  onClick={() => selectScent("sunday")}
                  aria-controls="scent-film"
                  aria-pressed={selected === "sunday"}
                >
                  Morning Dew
                </button>
                <button
                  type="button"
                  data-film="citrus"
                  onClick={() => selectScent("citrus")}
                  aria-controls="scent-film"
                  aria-pressed={selected === "citrus"}
                >
                  White Linen
                </button>
                <button
                  type="button"
                  data-film="petal"
                  onClick={() => selectScent("petal")}
                  aria-controls="scent-film"
                  aria-pressed={selected === "petal"}
                >
                  Quiet Bloom
                </button>
                <button
                  type="button"
                  data-film="rain"
                  onClick={() => selectScent("rain")}
                  aria-controls="scent-film"
                  aria-pressed={selected === "rain"}
                >
                  Sandal Haze
                </button>
              </div>
            </div>
            <video
              id="scent-film"
              width="640"
              height="800"
              controls={true}
              playsInline={true}
              preload="none"
              poster={`${BASE}assets/${filmName}-scene.webp`}
              src={`${BASE}assets/${filmName}.mp4`}
              key={filmName}
              aria-label={`${scent.name} 무음 영상`}
              aria-describedby="film-caption"
            >
              브라우저에서 영상 재생을 지원하지 않습니다.
            </video>
          </div>
        </section>
        <section className="closing">
          <p className="eyebrow">A SOFT PRESENCE, EVERY DAY</p>
          <h2>일상에 스며들어, 오래 남는 향.</h2>
          <a href="#">BACK TO TOP ↑</a>
        </section>
      </main>
      <footer>
        <div>
          <a href="#" className="footer-logo">
            ELUNE
          </a>
          <p>A SOFT PRESENCE, A LASTING SCENT.</p>
        </div>
        <p>
          가상 향수 브랜드 웹디자인 · 개인 포트폴리오 프로젝트
          <br />
          브랜드·제품·이미지는 콘셉트 표현을 위한 창작물입니다.
        </p>
        <span>© 2026 ELUNE CONCEPT</span>
      </footer>
    </>
  );
}
