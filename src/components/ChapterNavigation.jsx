export default function ChapterNavigation({
  currentChapter,
  chapterCount,
  moveChapter,
}) {
  return (
    <div className="chapter-navigation" aria-label="챕터 이동">
      {[-1, 1].map((direction) => (
        <button
          key={direction}
          type="button"
          className="chapter-nav-button"
          onClick={() => moveChapter(direction)}
          disabled={
            direction === -1
              ? currentChapter === 0
              : currentChapter === chapterCount - 1
          }
          aria-label={
            direction === -1 ? "이전 챕터로 이동" : "다음 챕터로 이동"
          }
        >
          <svg
            className={direction === 1 ? "arrow-down" : "arrow-up"}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3.00763 19L11.9991 3.54545L21.0048 19H3.00763ZM5.0886 17.8068H18.9238L11.9991 5.90341L5.0886 17.8068Z"
              fill="currentColor"
            />
          </svg>
        </button>
      ))}
    </div>
  );
}
