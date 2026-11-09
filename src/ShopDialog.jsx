import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// ELUNE 체험용 계정 및 주문 데이터 저장 키
const ACCOUNT_KEY = "elune.accounts.v1";
const ORDER_KEY = "elune.orders.v1";
const SESSION_KEY = "elune.session.v1";
const DEMO_ACCOUNT = {
  email: "elune@test.com",
  password: "elune1234",
};

function readRecords(key) {
  const value = JSON.parse(localStorage.getItem(key) || "[]");
  return Array.isArray(value) ? value : [];
}
const normalizeEmail = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();
const won = (value) => `₩ ${Number(value).toLocaleString("ko-KR")}`;
function randomHex(length) {
  return Array.from(crypto.getRandomValues(new Uint8Array(length)), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
async function passwordDigest(password, salt) {
  if (!crypto.subtle) throw new Error("secure-origin-required");
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: encoder.encode(salt),
      iterations: 150000,
    },
    key,
    256,
  );
  return Array.from(new Uint8Array(bits), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}
function Orders({ orders }) {
  if (!orders.length) return <p>조회할 주문이 없습니다.</p>;
  return (
    <ul className="shop-orders">
      {orders.map((order) => (
        <li className="shop-order" key={order.number}>
          <strong>
            {order.name} · {order.volume} mL
          </strong>
          <p>
            주문번호 <code>{order.number}</code>
          </p>
          <p>{won(order.amount)} · 체험 주문 접수</p>
          <p>{new Date(order.date).toLocaleString("ko-KR")}</p>
        </li>
      ))}
    </ul>
  );
}
function EmailField() {
  return (
    <label>
      이메일
      <input
        type="email"
        name="email"
        required
        maxLength={120}
        autoComplete="username"
        placeholder="elune@test.com"
      />
    </label>
  );
}

const ShopDialog = forwardRef(function ShopDialog(
  { selectedProduct, size, price },
  ref,
) {
  const dialogRef = useRef(null);
  const [screen, setScreen] = useState(null);
  const [memberEmail, setMemberEmail] = useState(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY) || "";
    } catch {
      return "";
    }
  });
  const [pendingOrder, setPendingOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [lookupResults, setLookupResults] = useState(null);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [copyStatus, setCopyStatus] = useState(null);
  const activeRef = useRef(0);
  const member = (() => {
    try {
      if (memberEmail === DEMO_ACCOUNT.email) return DEMO_ACCOUNT;
      return (
        readRecords(ACCOUNT_KEY).find((a) => a.email === memberEmail) || null
      );
    } catch {
      return null;
    }
  })();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (screen && !dialog.open) dialog.showModal();
    if (!screen && dialog.open) dialog.close();
  }, [screen]);

  function navigate(next) {
    setMessage("");
    setCopyStatus(null);
    setLookupResults(null);
    setScreen(next);
  }
  function openAccount() {
    navigate(member ? "account" : "login");
  }
  function openCheckout() {
    setPendingOrder({
      name: selectedProduct.name,
      volume: size,
      amount: price,
    });
    navigate("checkout");
  }
  useImperativeHandle(ref, () => ({ openCheckout }));
  function closeDialog() {
    activeRef.current += 1;
    setScreen(null);
    setPendingOrder(null);
    setCredentials(null);
    setCopyStatus(null);
    setCompletedOrder(null);
    setMessage("");
    setBusy(false);
  }
  function logout() {
    try {
      sessionStorage.removeItem(SESSION_KEY);
      setMemberEmail("");
      navigate("login");
    } catch {
      setMessage("브라우저 저장소 설정을 확인해 주세요.");
    }
  }
  async function register(email, password, requestId) {
    const salt = randomHex(16);
    const digest = await passwordDigest(password, salt);
    if (activeRef.current !== requestId) return false;
    const accounts = readRecords(ACCOUNT_KEY);
    if (accounts.some((a) => a.email === email)) {
      setMessage("이미 가입된 이메일입니다. 로그인해 주세요.");
      return false;
    }
    localStorage.setItem(
      ACCOUNT_KEY,
      JSON.stringify([...accounts, { email, salt, digest }]),
    );
    sessionStorage.setItem(SESSION_KEY, email);
    setMemberEmail(email);
    return true;
  }
  async function copyCredentials() {
    if (!credentials) return;
    try {
      if (!navigator.clipboard?.writeText) throw new Error("clipboard-unavailable");
      await navigator.clipboard.writeText(
        `이메일: ${credentials.email}\n비밀번호: ${credentials.password}`,
      );
      setCopyStatus({ message: "복사되었습니다.", failed: false });
    } catch {
      setCopyStatus({
        message: "복사하지 못했습니다. 계정 정보를 직접 선택해 복사해 주세요.",
        failed: true,
      });
    }
  }
  async function onSubmit(event) {
    event.preventDefault();
    if (busy) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = normalizeEmail(data.get("email"));
    const password = String(data.get("password") || "");
    const requestId = ++activeRef.current;
    setMessage("");
    setBusy(true);
    try {
      if (screen === "login") {
        const isDemoAccount =
          email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password;
        const account = isDemoAccount
          ? DEMO_ACCOUNT
          : readRecords(ACCOUNT_KEY).find((a) => a.email === email);
        const isRegisteredAccount =
          account &&
          account !== DEMO_ACCOUNT &&
          (await passwordDigest(password, account.salt)) === account.digest;
        if (!isDemoAccount && !isRegisteredAccount) {
          if (activeRef.current === requestId)
            setMessage("이메일 또는 비밀번호를 확인해 주세요.");
          return;
        }
        if (activeRef.current !== requestId) return;
        sessionStorage.setItem(SESSION_KEY, email);
        setMemberEmail(email);
        navigate(null);
      } else if (screen === "signup") {
        if (password !== data.get("confirm")) {
          setMessage("비밀번호 확인이 일치하지 않습니다.");
          return;
        }
        if (await register(email, password, requestId)) navigate("welcome");
      } else if (screen === "quick") {
        const quickEmail = `elune-${randomHex(6)}@example.com`;
        const quickPassword = randomHex(9);
        if (await register(quickEmail, quickPassword, requestId)) {
          setCredentials({ email: quickEmail, password: quickPassword });
          navigate("credentials");
        }
      } else if (screen === "checkout") {
        if (!pendingOrder) return;
        const order = {
          ...pendingOrder,
          email: member?.email || email,
          memberEmail: member?.email || null,
          number: `MR-${randomHex(6).toUpperCase()}`,
          date: new Date().toISOString(),
        };
        localStorage.setItem(
          ORDER_KEY,
          JSON.stringify([...readRecords(ORDER_KEY), order]),
        );
        setCompletedOrder(order);
        setPendingOrder(null);
        navigate("complete");
      } else if (screen === "lookup") {
        const number = String(data.get("number") || "")
          .trim()
          .toUpperCase();
        const found = readRecords(ORDER_KEY).find(
          (o) => o.number === number && o.email === email,
        );
        setLookupResults(found ? [found] : []);
      }
    } catch (error) {
      if (activeRef.current !== requestId) return;
      setMessage(
        error.message === "secure-origin-required"
          ? "가입과 로그인은 HTTPS 사이트에서 이용할 수 있습니다."
          : "처리하지 못했습니다. 브라우저 저장소 설정을 확인하고 다시 시도해 주세요.",
      );
    } finally {
      if (activeRef.current === requestId) setBusy(false);
    }
  }

  const title = {
    login: "로그인",
    signup: "회원가입",
    quick: "간편 회원가입",
    credentials: "간편가입 완료",
    account: "내 계정",
    checkout: member ? "회원 주문" : "비회원 주문",
    lookup: "주문 조회",
    complete: "주문 완료",
    welcome: "ELUNE에 오신 것을 환영합니다.",
  }[screen];
  const action = (target, label, primary = false) => (
    <button
      type="button"
      className={primary ? "button" : "shop-secondary"}
      onClick={() => navigate(target)}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="shop-nav">
        <button type="button" id="shop-account" onClick={openAccount}>
          {member ? "내 계정" : "로그인"}
        </button>
        <button type="button" onClick={() => navigate("lookup")}>
          주문 조회
        </button>
      </div>
      <dialog
        ref={dialogRef}
        id="shop-dialog"
        className={screen === "welcome" ? "is-welcome" : undefined}
        aria-labelledby="shop-title"
        onClose={closeDialog}
        onCancel={() => {
          activeRef.current += 1;
        }}
      >
        <button
          type="button"
          className="close-dialog"
          aria-label="닫기"
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>
        <p className="eyebrow">
          {screen === "welcome" ? "WELCOME TO ELUNE" : "ELUNE / SHOP"}
        </p>
        {screen === "welcome" && (
          <span className="welcome-check" aria-hidden="true">
            ✓
          </span>
        )}
        <h2 id="shop-title" tabIndex={-1}>
          {title}
        </h2>
        {screen === "login" && (
          <aside className="demo-account" aria-label="체험용 로그인 계정">
            <p className="demo-account-title">
              체험용 계정으로 로그인해 보세요.
            </p>
            <dl>
              <div>
                <dt>아이디</dt>
                <dd>{DEMO_ACCOUNT.email}</dd>
              </div>
              <div>
                <dt>비밀번호</dt>
                <dd>{DEMO_ACCOUNT.password}</dd>
              </div>
            </dl>
          </aside>
        )}
        {screen !== "welcome" && (
          <p className="shop-hint">
            예시 이메일과 체험용 비밀번호를 사용해보세요.
          </p>
        )}
        <div id="shop-view">
          {screen === "login" && (
            <>
              <form className="shop-form" onSubmit={onSubmit}>
                <EmailField />
                <label>
                  비밀번호
                  <input
                    type="password"
                    name="password"
                    required
                    maxLength={128}
                    autoComplete="current-password"
                  />
                </label>
                <button className="button" disabled={busy}>
                  로그인
                </button>
              </form>
              <div className="shop-actions">
                {action("signup", "회원가입")}
                {action("quick", "간편 회원가입")}
                {pendingOrder && action("checkout", "주문으로 돌아가기")}
              </div>
            </>
          )}
          {screen === "signup" && (
            <>
              <form className="shop-form" onSubmit={onSubmit}>
                <EmailField />
                <label>
                  비밀번호
                  <input
                    type="password"
                    name="password"
                    required
                    minLength={8}
                    maxLength={128}
                    autoComplete="new-password"
                    placeholder="8자 이상"
                  />
                </label>
                <label>
                  비밀번호 확인
                  <input
                    type="password"
                    name="confirm"
                    required
                    maxLength={128}
                    autoComplete="new-password"
                  />
                </label>
                <button className="button" disabled={busy}>
                  가입하고 시작하기
                </button>
              </form>
              <div className="shop-actions">
                {action("login", "로그인으로 돌아가기")}
              </div>
            </>
          )}
          {screen === "welcome" && (
            <div className="welcome-view">
              <p>회원가입이 완료되었습니다.</p>
              <p className="welcome-message">
                당신의 일상에 은은한 향기가 머물기를 바랍니다.
              </p>
              <button
                type="button"
                className="button"
                onClick={() => navigate(null)}
              >
                쇼핑 계속하기
              </button>
            </div>
          )}
          {screen === "quick" && (
            <>
              <p>체험용 이메일과 비밀번호를 발급하고 바로 로그인합니다.</p>
              <form className="shop-form" onSubmit={onSubmit}>
                <button className="button" disabled={busy}>
                  체험 계정 만들기
                </button>
              </form>
              <div className="shop-actions">
                {action("login", "로그인으로 돌아가기")}
              </div>
            </>
          )}
          {screen === "credentials" && credentials && (
            <>
              <div className="shop-summary">
                <p className="credentials-guide">
                  발급된 계정 정보를 보관해 주세요.
                </p>
                <p>
                  이메일 <code>{credentials.email}</code>
                </p>
                <p>
                  비밀번호 <code>{credentials.password}</code>
                </p>
                <button
                  type="button"
                  className="credential-copy"
                  onClick={copyCredentials}
                >
                  계정 정보 복사
                </button>
                {copyStatus && (
                  <p
                    className={`copy-status${copyStatus.failed ? " is-error" : ""}`}
                    role="status"
                  >
                    {copyStatus.message}
                  </p>
                )}
                <p>다시 로그인할 때 사용할 정보를 복사해 두세요.</p>
              </div>
              <div className="shop-actions">
                {action(null, "쇼핑 계속하기", true)}
              </div>
            </>
          )}
          {screen === "account" && member && (
            <>
              <p>{member.email}</p>
              <h3>회원 주문 내역</h3>
              <Orders
                orders={readRecords(ORDER_KEY)
                  .filter((o) => o.memberEmail === member.email)
                  .reverse()}
              />
              <div className="shop-actions">
                <button
                  type="button"
                  className="shop-secondary"
                  onClick={logout}
                >
                  로그아웃
                </button>
              </div>
            </>
          )}
          {screen === "checkout" && pendingOrder && (
            <>
              <div className="shop-summary">
                <strong>
                  {pendingOrder.name} · {pendingOrder.volume} mL
                </strong>
                <p>수량 1개 · {won(pendingOrder.amount)}</p>
              </div>
              <form className="shop-form" onSubmit={onSubmit}>
                {member ? <p>주문 계정 · {member.email}</p> : <EmailField />}
                <button className="button" disabled={busy}>
                  {member ? "회원" : "비회원"} 주문 접수
                </button>
              </form>
              {!member && (
                <div className="shop-actions">
                  {action("login", "로그인하고 주문하기")}
                </div>
              )}
            </>
          )}
          {screen === "lookup" && (
            <>
              <form className="shop-form" onSubmit={onSubmit}>
                <label>
                  주문번호
                  <input
                    name="number"
                    required
                    maxLength={40}
                    placeholder="MR-XXXXXXXXXXXX"
                  />
                </label>
                <EmailField />
                <button className="button" disabled={busy}>
                  주문 조회
                </button>
              </form>
              <div id="shop-lookup-result" aria-live="polite">
                {lookupResults !== null && <Orders orders={lookupResults} />}
              </div>
            </>
          )}
          {screen === "complete" && completedOrder && (
            <>
              <Orders orders={[completedOrder]} />
              <p>주문번호와 주문에 사용한 이메일로 조회할 수 있어요.</p>
              <div className="shop-actions">
                {action("lookup", "주문 조회", true)}
              </div>
            </>
          )}
        </div>
        <p id="shop-message" role="status">
          {message}
        </p>
      </dialog>
    </>
  );
});

export default ShopDialog;
