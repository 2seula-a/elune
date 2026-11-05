const sundayFragrance = {
  name: 'Sunday Still',
  koreanName: '선데이 스틸',
  image: 'perfume',
  description: '일요일 오후의 느긋함을 담은 무화과 우디 향. 가볍게 시작해, 당신만의 온기로 남습니다.',
  keywords: 'GREEN · SOFT · WOODY',
  notes: { ...notes },
};

function makeNote(label, title, subtitle, desc, tags, word) {
  return { label, title, subtitle, desc, tags, word };
}

const fragrances = {
  sunday: sundayFragrance,
  citrus: {
    name: 'Citrus Hour',
    koreanName: '시트러스 아워',
    image: 'citrus-hour',
    description: '레몬을 막 자른 듯한 산뜻함에 네롤리의 가벼운 꽃향을 더했습니다. 햇살 좋은 아침에 어울리는 향입니다.',
    keywords: 'BRIGHT · FRESH · CITRUS',
    notes: {
      top: makeNote('THE FIRST IMPRESSION', 'Lemon & Grapefruit', '갓 자른 레몬의 상쾌함', '레몬 껍질의 톡 쏘는 향 사이로 자몽의 씁쓸한 단맛이 살짝 비칩니다.', ['상쾌한', '시트러스', '밝은'], 'lemon.'),
      heart: makeNote('THE SOFT HEART', 'Neroli & Green Tea', '가볍게 번지는 오렌지꽃', '네롤리의 맑은 꽃향에 녹차의 산뜻하고 담백한 느낌을 더했습니다.', ['은은한', '플로럴', '티 노트'], 'bloom.'),
      base: makeNote('THE LASTING MEMORY', 'White Musk & Cedar', '햇볕에 말린 셔츠 같은 여운', '부드러운 화이트 머스크 뒤로 마른 나무 향이 살짝 남습니다.', ['깨끗한', '머스크', '우디'], 'musk.'),
    },
  },
  petal: {
    name: 'Petal Letter',
    koreanName: '페탈 레터',
    image: 'petal-letter',
    description: '장미와 피오니의 향을 편지 사이에 끼워 둔 꽃잎처럼 담았습니다. 부드러운 플로럴 향을 좋아하는 날에 어울립니다.',
    keywords: 'SOFT · ROSY · FLORAL',
    notes: {
      top: makeNote('THE FIRST IMPRESSION', 'Pear & Pink Pepper', '잘 익은 배의 맑은 단맛', '배의 투명한 과일 향에 핑크 페퍼가 가벼운 톡 쏘는 느낌을 더합니다.', ['맑은', '프루티', '가벼운'], 'pear.'),
      heart: makeNote('THE SOFT HEART', 'Rose & Peony', '겹겹이 피어나는 분홍 꽃잎', '장미의 잔잔한 단맛에 피오니의 수분감 있는 꽃향이 포개집니다.', ['부드러운', '플로럴', '로지'], 'rose.'),
      base: makeNote('THE LASTING MEMORY', 'Iris & White Musk', '종이에 남은 꽃잎의 자국', '보송한 아이리스와 화이트 머스크가 피부 가까이 은은하게 머뭅니다.', ['보송한', '파우더리', '머스크'], 'iris.'),
    },
  },
  rain: {
    name: 'After Rain',
    koreanName: '애프터 레인',
    image: 'after-rain',
    description: '비가 그친 뒤 숲길에서 느껴지는 젖은 나무와 이끼의 향. 차분하고 깊은 우디 향을 담았습니다.',
    keywords: 'GREEN · EARTHY · WOODY',
    notes: {
      top: makeNote('THE FIRST IMPRESSION', 'Juniper & Bergamot', '비 그친 숲의 서늘한 공기', '주니퍼의 푸른 향과 베르가모트의 산뜻함이 서늘하고 맑게 시작합니다.', ['서늘한', '그린', '상쾌한'], 'mist.'),
      heart: makeNote('THE SOFT HEART', 'Cedarwood & Cypress', '빗물을 머금은 나무', '곧은 시더우드 향에 사이프러스의 짙고 초록빛 나는 향이 겹칩니다.', ['푸른', '우디', '차분한'], 'cedar.'),
      base: makeNote('THE LASTING MEMORY', 'Oakmoss & Vetiver', '오래 남는 흙과 이끼의 향', '오크모스와 베티버가 젖은 흙을 닮은 깊은 여운을 남깁니다.', ['깊은', '이끼', '흙내음'], 'moss.'),
    },
  },
};

const fragranceCards = document.querySelectorAll('.fragrance-card');
const productImage = document.querySelector('.collection-image img');
let selectedProduct = sundayFragrance;

function updateProductImage() {
  const suffix = size === '30' ? '-30' : '';
  productImage.src = 'assets/' + selectedProduct.image + suffix + '.webp';
  productImage.alt = selectedProduct.koreanName + ' 오 드 퍼퓸 ' + size + ' mL 향수병';
}

function selectFragrance(card) {
  const fragrance = fragrances[card.dataset.fragrance];
  fragranceCards.forEach(button => {
    button.setAttribute('aria-pressed', String(button === card));
  });

  Object.assign(notes, fragrance.notes);
  document.querySelector('.art-word small').textContent = fragrance.keywords;
  activateTab(tabs[0]);

  document.querySelector('.product h2').textContent = fragrance.name;
  document.querySelector('.product-ko').textContent = fragrance.koreanName + ' 오 드 퍼퓸';
  document.querySelector('.product-description').textContent = fragrance.description;
  document.querySelector('#fragrance-status').textContent = '선택한 향 · ' + fragrance.koreanName;
  document.querySelector('.product details p').textContent =
    fragrance.koreanName + ' 오 드 퍼퓸 선택 용량 1개와 패키지로 구성한 가상 상품입니다. 상품명·향 구성·가격은 디자인을 위한 예시입니다.';
  selectedProduct = fragrance;
  updateProductImage();
  selectFilm(card.dataset.fragrance, fragrance);
}

fragranceCards.forEach(card => {
  card.addEventListener('click', () => selectFragrance(card));
});

const filmCaptions = {
  sunday: '오후 햇살이 무화과나무 사이로 스며들고, 바람에 잎이 가만히 흔들립니다.',
  citrus: '아침 햇살 속 레몬나무 가지와 하얀 오렌지꽃이 가볍게 흔들립니다.',
  petal: '옅은 아침빛 속 장미와 피오니 사이로 부드러운 바람이 스칩니다.',
  rain: '비가 갠 숲, 젖은 이끼를 끼고 흐르는 물 위로 잔물결이 번집니다.',
};
const filmPlayer = document.querySelector('#scent-film');
const filmOptions = document.querySelectorAll('[data-film]');

function selectFilm(key, fragrance) {
  const filename = key === 'sunday' ? 'sunday-still' : fragrance.image;
  const source = 'assets/' + filename + '.mp4';
  if (filmPlayer.getAttribute('src') === source) return;

  filmPlayer.pause();
  filmPlayer.poster = 'assets/' + filename + '-scene.webp';
  filmPlayer.src = source;
  filmPlayer.setAttribute('aria-label', fragrance.name + ' 무음 영상');
  document.querySelector('#film-caption').textContent = filmCaptions[key];
  filmOptions.forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.film === key));
  });
}

filmOptions.forEach(button => {
  button.addEventListener('click', () => {
    const card = Array.from(fragranceCards).find(card => card.dataset.fragrance === button.dataset.film);
    if (card) selectFragrance(card);
  });
});
