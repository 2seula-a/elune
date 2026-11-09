
export default function DailyRitual() {
  const BASE = import.meta.env.BASE_URL;

  const rituals = [
    {
      num: "01",
      icon: "icon_1.svg",
      eyebrow: "A SOFT BEGINNING",
      title: "부드러운 시작",
      copy: "피부 위에 가볍게 스며들어, 하루의 첫 순간을 은은하게 채웁니다.",
    },
    {
      num: "02",
      icon: "icon_2.svg",
      eyebrow: "A QUIET PRESENCE",
      title: "잔잔한 존재감",
      copy: "크게 드러나지 않아도, 일상 속에 자연스럽게 머무는 향.",
    },
    {
      num: "03",
      icon: "icon_3.svg",
      eyebrow: "A LASTING SCENT",
      title: "오래 남는 잔향",
      copy: "시간이 흐른 뒤에도 피부 가까이 부드러운 여운을 남깁니다.",
    },
  ];

  return (
    <section id="ritual" className="ritual section">
      <div className="section-top">
        <div>
          <h2>
            당신의 일상에 <em>스며드는 순간.</em>
          </h2>
        </div>
      </div>

      <div className="ritual-grid">
        {rituals.map(({ num, icon, eyebrow, title, copy }) => (
          <article key={num}>
            <span className="ritual-num">{num}</span>

            <div className="ritual-icon">
              <img src={`${BASE}images/${icon}`} alt="" />
            </div>

            <p className="eyebrow">{eyebrow}</p>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
