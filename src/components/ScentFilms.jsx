const labels = {
  morningDew: "Morning Dew",
  whiteLinen: "White Linen",
  quietBloom: "Quiet Bloom",
  sandalHaze: "Sandal Haze",
};

export default function ScentFilms({
  base,
  captions,
  selected,
  scent,
  filmName,
  selectScent,
}) {
  return (
    <section
      id="scent-films"
      className="section scent-films"
      aria-labelledby="scent-films-title"
    >
      <div className="film-layout">
        <div className="film-copy">
          <h2 id="scent-films-title">
            향을 닮은 <em>네 가지 장면.</em>
          </h2>
          <p id="film-caption" aria-live="polite">
            {captions[selected]}
          </p>
          <div className="film-options" role="group" aria-label="향 영상 선택">
            {Object.entries(labels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                data-film={key}
                onClick={() => selectScent(key)}
                aria-controls="scent-film"
                aria-pressed={selected === key}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <video
          id="scent-film"
          width="800"
          height="450"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls
          src={`${base}video/${filmName}.mp4`}
          key={filmName}
          aria-label={`${scent.name} 무음 영상`}
          aria-describedby="film-caption"
        >
          브라우저에서 영상 재생을 지원하지 않습니다.
        </video>
      </div>
    </section>
  );
}
