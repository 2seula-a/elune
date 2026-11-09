const note = (label, title, subtitle, desc, tags, word) => ({
  label,
  title,
  subtitle,
  desc,
  tags,
  word,
});

export const catalog = {
  morningDew: {
    name: "Morning Dew",
    ko: "모닝 듀",
    image: "morning-dew",
    family: "Fresh Floral",
    color: "#D5E5F1",
    mood: "깨끗함 · 상쾌함 · 맑은 아침 공기",
    time: "상쾌한 아침",
    description: "이른 아침, 꽃잎에 맺힌 이슬처럼 맑고 산뜻한 향.",
    keywords: "FRESH · FLORAL · CLEAR",
    notes: {
      top: note("TOP NOTES", "Bergamot & Green Apple", "아침을 여는 투명한 산뜻함", "베르가모트의 맑은 시트러스 향과 그린 애플의 싱그러운 기운이 깨끗한 첫인상을 만듭니다.", ["깨끗함", "상쾌함", "아침"], "dew."),
      heart: note("MIDDLE NOTES", "White Jasmine & Lily of the Valley", "이슬을 머금은 하얀 꽃잎", "화이트 재스민과 은방울꽃이 맑고 섬세하게 피어나 프레시 플로럴의 중심을 완성합니다.", ["화이트 플로럴", "맑은", "섬세한"], "bloom."),
      base: note("BASE NOTES", "White Musk & Cedarwood", "깨끗하게 이어지는 잔잔한 여운", "화이트 머스크의 보드라움과 시더우드의 담백함이 피부 위에 깨끗한 아침 공기처럼 머뭅니다.", ["화이트 머스크", "잔잔한", "클린"], "musk."),
    },
  },
  whiteLinen: {
    name: "White Linen",
    ko: "화이트 리넨",
    image: "white-linen",
    family: "Clean Musk",
    color: "#F0F1ED",
    mood: "보송함 · 편안함 · 갓 세탁한 침구",
    time: "여유로운 낮",
    description: "따스한 햇살 아래 바짝 말린 하얀 침구처럼 포근하고 부드러운 향.",
    keywords: "CLEAN · MUSK · COMFORT",
    notes: {
      top: note("TOP NOTES", "Cotton & Aldehydes", "햇살에 말린 하얀 코튼", "깨끗한 코튼과 투명한 알데하이드가 갓 세탁한 리넨처럼 보송하고 산뜻하게 시작됩니다.", ["코튼", "보송한", "클린"], "linen."),
      heart: note("MIDDLE NOTES", "Iris & White Rose", "부드럽게 포개지는 흰 꽃", "아이리스의 파우더리함과 화이트 로즈의 은은한 꽃향이 포근하고 정돈된 인상을 더합니다.", ["아이리스", "화이트 로즈", "편안한"], "cotton."),
      base: note("BASE NOTES", "Soft Musk & Sandalwood", "살결 가까이 남는 포근함", "소프트 머스크와 샌달우드가 따스한 낮의 햇살처럼 부드럽고 편안한 여운을 남깁니다.", ["소프트 머스크", "포근한", "샌달우드"], "soft."),
    },
  },
  quietBloom: {
    name: "Quiet Bloom",
    ko: "콰이어트 블룸",
    image: "quiet-bloom",
    family: "Soft Floral",
    color: "#EFD4D3",
    mood: "사랑스러움 · 차분함 · 은은한 꽃향기",
    time: "부드러운 오후",
    description: "고요한 정원에서 꽃이 천천히 피어나는 순간을 담은 은은하고 우아한 향.",
    keywords: "SOFT · FLORAL · GRACEFUL",
    notes: {
      top: note("TOP NOTES", "Peony & Pink Pepper", "천천히 열리는 첫 꽃잎", "피오니의 수분감 있는 꽃향에 핑크 페퍼의 산뜻한 생기가 더해져 사랑스럽게 시작됩니다.", ["피오니", "사랑스러운", "은은한"], "petal."),
      heart: note("MIDDLE NOTES", "Rose & Freesia", "고요한 정원에 번지는 꽃향기", "로즈와 프리지아가 섬세하게 포개지며 차분하고 우아한 소프트 플로럴을 표현합니다.", ["로즈", "프리지아", "우아한"], "rose."),
      base: note("BASE NOTES", "Amber & White Musk", "따뜻하고 은은하게 남는 꽃의 기억", "앰버의 잔잔한 온기와 화이트 머스크가 오후의 꽃향을 부드럽게 감싸며 오래 머뭅니다.", ["앰버", "화이트 머스크", "차분한"], "amber."),
    },
  },
  sandalHaze: {
    name: "Sandal Haze",
    ko: "샌달 헤이즈",
    image: "sandal-haze",
    family: "Soft Woody",
    color: "#C6A88D",
    mood: "따뜻함 · 차분함 · 깊은 휴식",
    time: "고요한 저녁",
    description: "해 질 무렵, 나무 향이 가득한 조용한 공간에서 느끼는 깊고 따뜻한 향.",
    keywords: "SOFT · WOODY · WARM",
    notes: {
      top: note("TOP NOTES", "Cardamom & Bergamot", "해 질 무렵의 따뜻한 공기", "카다멈의 은은한 스파이스와 베르가모트의 밝은 기운이 조용하고 따뜻한 저녁을 엽니다.", ["카다멈", "따뜻한", "차분한"], "haze."),
      heart: note("MIDDLE NOTES", "Sandalwood & Cedarwood", "고요한 공간을 채우는 나무 향", "크리미한 샌달우드와 담백한 시더우드가 어우러져 깊고 부드러운 우디 노트를 만듭니다.", ["샌달우드", "시더우드", "소프트 우디"], "wood."),
      base: note("BASE NOTES", "Amber, Vanilla & Musk", "깊은 휴식처럼 포근한 마무리", "앰버와 바닐라의 온기를 머스크가 부드럽게 감싸며 고요한 저녁처럼 깊은 여운을 남깁니다.", ["앰버", "바닐라", "머스크"], "rest."),
    },
  },
};

export const captions = {
  morningDew: "이른 아침의 맑은 공기와 꽃잎 위 이슬이 산뜻하게 하루를 엽니다.",
  whiteLinen: "따스한 낮의 햇살 아래, 깨끗한 리넨이 바람에 부드럽게 흔들립니다.",
  quietBloom: "고요한 오후의 정원에서 꽃잎이 천천히 피어나 은은한 향을 전합니다.",
  sandalHaze: "해 질 무렵의 조용한 공간을 따뜻하고 깊은 나무 향이 채웁니다.",
};

export const productImages = {
  morningDew: { 30: "ELUNE_Morning_Dew_30ML.png", 50: "ELUNE_Morning_Dew_50ML.png" },
  whiteLinen: { 30: "ELUNE_White_Linen_30ML.png", 50: "ELUNE_White_Linen_50ML.png" },
  quietBloom: { 30: "ELUNE_Quiet_Bloom30ML.png", 50: "ELUNE_Quiet_Bloom50ML.png" },
  sandalHaze: { 30: "ELUNE_Sandal_Haze_30ML.png", 50: "ELUNE_Sandal_Haze_50ML.png" },
};

export const filmFiles = {
  morningDew: "Morning_Dew",
  whiteLinen: "White_Linen",
  quietBloom: "Quiet_Bloom_Trim",
  sandalHaze: "Sandal_Haze",
};

export const prices = { 30: 58000, 50: 82000 };

export const chapters = [
  ".hero",
  "#story",
  "#fragrances",
  "#scent",
  "#ritual",
  "#collection",
  "#scent-films",
  ".closing",
];
