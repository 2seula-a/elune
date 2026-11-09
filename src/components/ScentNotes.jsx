export default function ScentNotes({ scent, activeNote, setActiveNote }) {
  const currentNote = scent.notes[activeNote];
  return (
    <>
      <section id="scent" className="scent section">
        <div className="section-top">
          <div>
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
              {[
                ["top", "01 TOP"],
                ["heart", "02 MIDDLE"],
                ["base", "03 BASE"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  id={`tab-${key}`}
                  role="tab"
                  aria-controls="note-panel"
                  aria-selected={activeNote === key}
                  data-note={key}
                  onClick={() => setActiveNote(key)}
                  tabIndex={activeNote === key ? 0 : -1}
                >
                  {label}
                </button>
              ))}
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
            <p className="note-hint">각 노트를 눌러 향의 변화를 살펴보세요 ↗</p>
          </div>
        </div>
      </section>
      <section className="quote">
        <p>A quiet kind of presence.</p>
        <span>크게 드러내지 않아도, 오래 기억되는 존재감.</span>
      </section>
    </>
  );
}
