export default function ProductDetail({
  base,
  catalog,
  selected,
  scent,
  size,
  setSize,
  productImage,
  price,
  selectScent,
  onPurchase,
}) {
  return (
    <section id="collection" className="collection">
      <div className="collection-image">
        <div className="collection-image-frame">
          <img
            src={`${base}images/${productImage}`}
            alt={`${scent.ko} 오 드 퍼퓸 ${size} mL 향수병`}
            loading="lazy"
          />
        </div>
        <span>ELUNE / SIGNATURE COLLECTION</span>
      </div>
      <div className="product">
        <div className="product-heading">
          <div>
            <h2>{scent.name}</h2>
            <p className="product-ko">{scent.ko} 오 드 퍼퓸</p>
          </div>
          <div className="scent-picker">
            <span className="scent-picker-label">OTHER SCENTS</span>
            <div
              className="scent-swatches"
              role="group"
              aria-label="다른 향수 보기"
            >
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
          <div>
            <dt>SCENT</dt>
            <dd>{scent.family}</dd>
          </div>
          <div>
            <dt>MOOD</dt>
            <dd>{scent.mood}</dd>
          </div>
          <div>
            <dt>TIME</dt>
            <dd>{scent.time}</dd>
          </div>
        </dl>
        <fieldset>
          <legend>
            SIZE <span>용량을 선택하세요</span>
          </legend>
          {["30", "50"].map((value) => (
            <button
              key={value}
              className={`size ${size === value ? "active" : ""}`}
              data-size={value}
              onClick={() => setSize(value)}
              aria-pressed={size === value}
            >
              {value} mL
            </button>
          ))}
        </fieldset>
        <div className="price-row">
          <span id="price">₩ {price.toLocaleString("ko-KR")}</span>
        </div>
        <button
          type="button"
          className="button product-button"
          onClick={onPurchase}
        >
          구매하기 <span>↗</span>
        </button>
        <details>
          <summary>
            상품 구성 안내 <span>+</span>
          </summary>
          <p>
            {scent.ko} 오 드 퍼퓸 선택 용량 1개와 패키지로 구성한 상품입니다.
          </p>
        </details>
        <details>
          <summary>
            향수 사용 및 보관 팁 <span>+</span>
          </summary>
          <p>
            눈과 점막을 피해 사용하고, 직사광선을 피해 보관하세요. 실제 제품을
            사용할 때는 해당 제품의 표시 사항을 확인하세요.
          </p>
        </details>
      </div>
    </section>
  );
}
