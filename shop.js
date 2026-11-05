const shopDialog = document.querySelector('#shop-dialog');
const shopTitle = document.querySelector('#shop-title');
const shopView = document.querySelector('#shop-view');
const shopMessage = document.querySelector('#shop-message');
const shopAccount = document.querySelector('#shop-account');
const accountKey = 'morrow.accounts.v1';
const orderKey = 'morrow.orders.v1';
const sessionKey = 'morrow.session.v1';
let pendingOrder;
let currentScreen;

function readRecords(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function currentMember() {
  const email = sessionStorage.getItem(sessionKey);
  return readRecords(accountKey).find(account => account.email === email);
}

function refreshAccountButton() {
  shopAccount.textContent = currentMember() ? '내 계정' : '로그인';
}

function normalizeEmail(value) {
  return value.trim().toLowerCase();
}

function randomHex(length) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)),
    byte => byte.toString(16).padStart(2, '0')).join('');
}

async function passwordDigest(password, salt) {
  if (!crypto.subtle) throw new Error('secure-origin-required');
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({
    name: 'PBKDF2', hash: 'SHA-256', salt: encoder.encode(salt), iterations: 150000,
  }, key, 256);
  return Array.from(new Uint8Array(bits), byte => byte.toString(16).padStart(2, '0')).join('');
}

async function registerMember(email, password, form) {
  const salt = randomHex(16);
  const digest = await passwordDigest(password, salt);
  if (!form.isConnected || !shopDialog.open) return false;
  const accounts = readRecords(accountKey);
  if (accounts.some(account => account.email === email)) {
    shopMessage.textContent = '이미 가입된 이메일입니다. 로그인해 주세요.';
    return false;
  }
  localStorage.setItem(accountKey, JSON.stringify([...accounts, { email, salt, digest }]));
  sessionStorage.setItem(sessionKey, email);
  refreshAccountButton();
  return true;
}

function escapeShopText(value) {
  const span = document.createElement('span');
  span.textContent = value;
  return span.innerHTML;
}

function renderOrders(orders) {
  if (!orders.length) return '<p>조회할 주문이 없습니다.</p>';
  return '<ul class="shop-orders">' + orders.map(order => `
    <li class="shop-order">
      <strong>${escapeShopText(order.name)} · ${escapeShopText(order.volume)} mL</strong>
      <p>주문번호 <code>${escapeShopText(order.number)}</code></p>
      <p>${escapeShopText(won(order.amount))} · 체험 주문 접수</p>
      <p>${escapeShopText(new Date(order.date).toLocaleString('ko-KR'))}</p>
    </li>`).join('') + '</ul>';
}

const emailField = '<label>이메일<input type="email" name="email" required maxlength="120" autocomplete="username" placeholder="scent@example.com"></label>';

function shopButton(action, label, primary = false) {
  return `<button type="button" class="${primary ? 'button' : 'shop-secondary'}" data-shop="${action}">${label}</button>`;
}

function renderShop(screen, extra = '') {
  currentScreen = screen;
  shopMessage.textContent = '';
  const member = currentMember();
  const screens = {
    login: ['로그인', `
      <form class="shop-form" data-form="login">
        ${emailField}
        <label>비밀번호<input type="password" name="password" required maxlength="128" autocomplete="current-password"></label>
        <button class="button">로그인</button>
      </form>
      <div class="shop-actions">
        ${shopButton('signup', '회원가입')}
        ${shopButton('quick', '간편 회원가입')}
        ${pendingOrder ? shopButton('checkout', '주문으로 돌아가기') : ''}
      </div>`],
    signup: ['회원가입', `
      <form class="shop-form" data-form="signup">
        ${emailField}
        <label>비밀번호<input type="password" name="password" required minlength="8" maxlength="128" autocomplete="new-password" placeholder="8자 이상"></label>
        <label>비밀번호 확인<input type="password" name="confirm" required maxlength="128" autocomplete="new-password"></label>
        <button class="button">가입하고 시작하기</button>
      </form>
      <div class="shop-actions">${shopButton('login', '로그인으로 돌아가기')}</div>`],
    quick: ['간편 회원가입', `
      <p>체험용 이메일과 비밀번호를 발급하고 바로 로그인합니다.</p>
      <form class="shop-form" data-form="quick"><button class="button">체험 계정 만들기</button></form>
      <div class="shop-actions">${shopButton('login', '로그인으로 돌아가기')}</div>`],
    credentials: ['간편가입 완료', extra + `<div class="shop-actions">${shopButton(pendingOrder ? 'checkout' : 'account', pendingOrder ? '주문 계속하기' : '내 계정 보기', true)}</div>`],
    account: ['내 계정', member ? `
      <p>${escapeShopText(member.email)}</p>
      <h3>회원 주문 내역</h3>
      ${renderOrders(readRecords(orderKey).filter(order => order.memberEmail === member.email).reverse())}
      <div class="shop-actions">${shopButton('logout', '로그아웃')}</div>` : ''],
    checkout: [member ? '회원 주문' : '비회원 주문', pendingOrder ? `
      <div class="shop-summary"><strong>${escapeShopText(pendingOrder.name)} · ${pendingOrder.volume} mL</strong><p>수량 1개 · ${won(pendingOrder.amount)}</p></div>
      <form class="shop-form" data-form="checkout">
        ${member ? `<p>주문 계정 · ${escapeShopText(member.email)}</p>` : emailField}
        <button class="button">${member ? '회원' : '비회원'} 체험 주문 접수</button>
      </form>
      ${member ? '' : `<div class="shop-actions">${shopButton('login', '로그인하고 주문하기')}</div>`}` : ''],
    lookup: ['주문 조회', `
      <form class="shop-form" data-form="lookup">
        <label>주문번호<input name="number" required maxlength="40" placeholder="MR-XXXXXXXXXXXX"></label>
        ${emailField}
        <button class="button">주문 조회</button>
      </form>
      <div id="shop-lookup-result" aria-live="polite"></div>`],
    complete: ['체험 주문 완료', extra + `<div class="shop-actions">${shopButton('lookup', '주문 조회', true)}</div>`],
  };
  const [title, markup] = screens[screen];
  shopTitle.textContent = title;
  shopView.innerHTML = markup;
  if (!shopDialog.open) shopDialog.showModal();
  shopTitle.focus();
}

document.addEventListener('click', event => {
  const button = event.target.closest('[data-shop]');
  if (!button) return;
  const action = button.dataset.shop;
  try {
    if (action === 'checkout' && !shopDialog.open) {
      pendingOrder = { name: selectedProduct.name, volume: size, amount: prices[size] };
    }
    if (action === 'logout') {
      sessionStorage.removeItem(sessionKey);
      refreshAccountButton();
      renderShop('login');
      return;
    }
    if (action === 'account') {
      renderShop(currentMember() ? 'account' : 'login');
      return;
    }
    renderShop(action);
  } catch {
    shopTitle.textContent = '주문 기능을 열 수 없어요';
    shopMessage.textContent = '브라우저 저장소 접근을 허용한 뒤 다시 시도해 주세요.';
    if (!shopDialog.open) shopDialog.showModal();
  }
});

shopDialog.querySelector('.close-dialog').addEventListener('click', () => shopDialog.close());
shopDialog.addEventListener('close', () => {
  pendingOrder = undefined;
  currentScreen = undefined;
  shopView.replaceChildren();
});

shopDialog.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.target;
  const submit = event.submitter;
  const data = new FormData(form);
  const email = normalizeEmail(data.get('email') || '');
  const password = data.get('password');
  shopMessage.textContent = '';
  if (submit) submit.disabled = true;
  try {
    switch (form.dataset.form) {
      case 'login': {
        const account = readRecords(accountKey).find(item => item.email === email);
        if (!account || await passwordDigest(password, account.salt) !== account.digest) {
          shopMessage.textContent = '이메일 또는 비밀번호를 확인해 주세요.';
          return;
        }
        if (!form.isConnected || !shopDialog.open) return;
        sessionStorage.setItem(sessionKey, email);
        refreshAccountButton();
        renderShop(pendingOrder ? 'checkout' : 'account');
        break;
      }
      case 'signup':
        if (password !== data.get('confirm')) {
          shopMessage.textContent = '비밀번호 확인이 일치하지 않습니다.';
          return;
        }
        if (await registerMember(email, password, form)) renderShop(pendingOrder ? 'checkout' : 'account');
        break;
      case 'quick': {
        const quickEmail = 'lento-' + randomHex(6) + '@example.com';
        const quickPassword = randomHex(9);
        if (await registerMember(quickEmail, quickPassword, form)) {
          renderShop('credentials', `<div class="shop-summary"><p>이메일 <code>${quickEmail}</code></p><p>비밀번호 <code>${quickPassword}</code></p><p>다시 로그인할 때 사용할 정보를 복사해 두세요.</p></div>`);
        }
        break;
      }
      case 'checkout': {
        if (!pendingOrder || currentScreen !== 'checkout') return;
        const member = currentMember();
        const order = {
          ...pendingOrder,
          email: member?.email || email,
          memberEmail: member?.email || null,
          number: 'MR-' + randomHex(6).toUpperCase(),
          date: new Date().toISOString(),
        };
        localStorage.setItem(orderKey, JSON.stringify([...readRecords(orderKey), order]));
        pendingOrder = undefined;
        renderShop('complete', renderOrders([order]) + '<p>주문번호와 주문에 사용한 이메일로 조회할 수 있어요.</p>');
        break;
      }
      case 'lookup': {
        const number = data.get('number').trim().toUpperCase();
        const order = readRecords(orderKey).find(item => item.number === number && item.email === email);
        document.querySelector('#shop-lookup-result').innerHTML = renderOrders(order ? [order] : []);
        break;
      }
    }
  } catch (error) {
    if (!form.isConnected || !shopDialog.open) return;
    shopMessage.textContent = error.message === 'secure-origin-required'
      ? '가입과 로그인은 HTTPS 사이트에서 이용할 수 있습니다.'
      : '처리하지 못했습니다. 브라우저 저장소 설정을 확인하고 다시 시도해 주세요.';
  } finally {
    if (submit) submit.disabled = false;
  }
});

try { refreshAccountButton(); } catch { /* The dialog reports storage errors when opened. */ }
