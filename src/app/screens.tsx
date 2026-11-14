import { FormEvent, ReactNode, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileText,
  HeartHandshake,
  Home,
  LifeBuoy,
  LockKeyhole,
  Menu,
  MessageCircleHeart,
  Phone,
  Plus,
  Route,
  ShieldCheck,
  Sparkles,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";

const cn = (...classes: Array<string | false | undefined>) => classes.filter(Boolean).join(" ");

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="WellPath AI home">
      <span className="brand-mark" aria-hidden="true">
        <svg viewBox="0 0 34 34" role="img">
          <path d="M7.5 17.2c3.7-1 5.7-3.9 6.3-8.5 4.8 3 7.1 7 6.9 11.9" />
          <path d="M9 23.5c3.3-3.3 7-4.4 11.1-3.2 2.8.8 4.9.3 6.4-1.5" />
          <path d="M12.2 27.1c3.2-2.4 6.8-3 10.7-1.8" />
        </svg>
      </span>
      <span>
        WellPath <strong>AI</strong>
      </span>
    </Link>
  );
}

const marketingLinks = [
  ["Home", "/"],
  ["How It Works", "/#how-it-works"],
  ["Support", "/support"],
  ["About", "/#approach"],
];

const appLinks = [
  { label: "Overview", to: "/dashboard", icon: Home },
  { label: "Check-in", to: "/assessment", icon: MessageCircleHeart },
  { label: "Insights", to: "/insights", icon: BarChart3 },
  { label: "Find support", to: "/support", icon: LifeBuoy },
  { label: "Journal", to: "/journal", icon: BookOpen },
  { label: "Follow-up", to: "/follow-up", icon: Route },
  { label: "Privacy", to: "/privacy", icon: ShieldCheck },
];

export function RootLayout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const appMode = !["/", "/login", "/signup", "/recover"].includes(location.pathname);

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className={cn("site-header", appMode && "app-header")}>
        <div className="header-inner">
          <Brand />
          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav className={cn("top-nav", menuOpen && "open")} aria-label="Main navigation">
            {(appMode ? appLinks.slice(0, 4).map((x) => [x.label, x.to]) : marketingLinks).map(
              ([label, to]) => (
                <Link key={label} to={to} onClick={() => setMenuOpen(false)}>
                  {label}
                </Link>
              ),
            )}
            {appMode ? (
              <>
                <Link to="/safety" className="urgent-link">
                  <Phone size={16} /> Urgent support
                </Link>
                <button className="avatar-button" aria-label="Open profile">
                  AM
                </button>
              </>
            ) : (
              <div className="header-actions">
                <Link to="/login" className="button button-ghost">
                  Sign in
                </Link>
                <Link to="/signup" className="button button-primary button-small">
                  Get started
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>
      <div className={cn(appMode && "app-shell")}>
        {appMode && (
          <aside className="side-nav" aria-label="WellPath workspace">
            <div className="demo-chip">
              <Sparkles size={14} /> Demonstration workspace
            </div>
            {appLinks.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => cn("side-link", isActive && "active")}
              >
                <Icon size={19} /> {label}
              </NavLink>
            ))}
            <div className="side-safety">
              <strong>Need help right now?</strong>
              <span>Connect with human support.</span>
              <Link to="/safety">
                View urgent options <ArrowRight size={15} />
              </Link>
            </div>
          </aside>
        )}
        <main id="main-content" className={cn(appMode && "app-main")}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function ButtonLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link to={to} className={cn("button", secondary ? "button-secondary" : "button-primary")}>
      {children}
    </Link>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>;
}

function TrustStrip() {
  return (
    <div className="trust-strip">
      <div>
        <ShieldCheck />
        <span>
          <strong>Private by design</strong>Your information stays in your control
        </span>
      </div>
      <div>
        <UserRound />
        <span>
          <strong>Human-led support</strong>AI helps navigate, never diagnoses
        </span>
      </div>
      <div>
        <CircleHelp />
        <span>
          <strong>Clear and transparent</strong>Understand every suggestion
        </span>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>Earlier support. Better wellbeing.</Eyebrow>
          <h1>
            Your wellbeing deserves attention, <em>earlier.</em>
          </h1>
          <p>
            Notice meaningful changes, reflect at your own pace, and find trusted human
            support—before things feel overwhelming.
          </p>
          <div className="button-row">
            <ButtonLink to="/assessment">
              Start a wellbeing check-in <ArrowRight size={18} />
            </ButtonLink>
            <ButtonLink to="/support" secondary>
              Explore support
            </ButtonLink>
          </div>
          <p className="microcopy">
            <LockKeyhole size={14} /> Your check-ins are private and optional. You’re always in
            control.
          </p>
        </div>
        <div className="hero-visual" aria-label="A calm wellbeing journey illustration">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />
          <div className="hero-card checkin-card">
            <div className="mini-label">
              <span className="status-dot" /> Today’s check-in
            </div>
            <h3>How are you feeling today?</h3>
            <div className="mood-row" aria-hidden="true">
              <span>Low</span>
              <i />
              <i />
              <i className="selected" />
              <i />
              <i />
              <span>Good</span>
            </div>
            <div className="mini-note">
              <CheckCircle2 size={17} /> A quiet moment can help you notice change.
            </div>
          </div>
          <div className="hero-card support-card">
            <span className="icon-tile">
              <HeartHandshake size={21} />
            </span>
            <span>
              <small>Support matched to your needs</small>
              <strong>Talk with a wellbeing adviser</strong>
            </span>
            <ChevronRight />
          </div>
          <svg className="leaf-art" viewBox="0 0 250 260" aria-hidden="true">
            <path d="M126 245C119 158 115 86 168 24" />
            <path d="M139 105c26-5 48-21 62-48-34-2-55 14-62 48Z" />
            <path d="M121 158c-23-1-46-15-63-41 32-6 55 7 63 41Z" />
            <path d="M153 65c-17-13-22-32-14-56 24 15 29 34 14 56Z" />
          </svg>
        </div>
      </section>
      <div className="content-wrap">
        <TrustStrip />
      </div>
      <section id="how-it-works" className="section content-wrap">
        <div className="section-heading centered">
          <Eyebrow>How it works</Eyebrow>
          <h2>A clearer path to the right support</h2>
          <p>
            Simple, private steps designed to help you understand what you need—without labels or
            pressure.
          </p>
        </div>
        <div className="steps-grid">
          {[
            [
              MessageCircleHeart,
              "01",
              "Check in with yourself",
              "Take a short, optional reflection using clear, non-diagnostic questions.",
            ],
            [
              BarChart3,
              "02",
              "Notice your patterns",
              "See changes over time with thoughtful context, never alarming predictions.",
            ],
            [
              HeartHandshake,
              "03",
              "Explore trusted support",
              "Compare appropriate options and choose the next step that feels right.",
            ],
          ].map(([Icon, number, title, text]) => {
            const I = Icon as typeof MessageCircleHeart;
            return (
              <article className="step-card" key={number as string}>
                <span className="step-number">{number as string}</span>
                <span className="large-icon">
                  <I />
                </span>
                <h3>{title as string}</h3>
                <p>{text as string}</p>
              </article>
            );
          })}
        </div>
      </section>
      <section id="approach" className="approach-section">
        <div className="content-wrap approach-grid">
          <div className="approach-art">
            <div className="rings">
              <span />
              <span />
              <span />
              <HeartHandshake />
            </div>
          </div>
          <div>
            <Eyebrow>Our approach</Eyebrow>
            <h2>Technology that supports human care—not replaces it.</h2>
            <p className="large-copy">
              WellPath AI helps you make sense of options and prepare for conversations with
              qualified professionals. You make every decision.
            </p>
            <ul className="check-list">
              <li>
                <Check /> No diagnoses or automated clinical decisions
              </li>
              <li>
                <Check /> Recommendations explain why they may be relevant
              </li>
              <li>
                <Check /> Human support is visible at every important step
              </li>
            </ul>
            <Link to="/support" className="text-link">
              Explore our support approach <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section content-wrap">
        <div className="privacy-banner">
          <div>
            <ShieldCheck />
          </div>
          <div>
            <Eyebrow>Privacy & safety</Eyebrow>
            <h2>Your story belongs to you.</h2>
            <p>
              Control what you share, change your mind at any time, and request deletion. Your
              wellbeing information is never shared with an employer or used for advertising.
            </p>
          </div>
          <ButtonLink to="/privacy" secondary>
            See your privacy controls
          </ButtonLink>
        </div>
      </section>
      <footer className="site-footer">
        <div className="content-wrap footer-grid">
          <div>
            <Brand />
            <p>A safer, clearer path to earlier mental wellbeing support.</p>
          </div>
          <div>
            <strong>Platform</strong>
            <Link to="/assessment">Wellbeing check-in</Link>
            <Link to="/support">Find support</Link>
            <Link to="/safety">Urgent support</Link>
          </div>
          <div>
            <strong>Company</strong>
            <a href="/#approach">Our approach</a>
            <a href="mailto:hello@wellpath.example">Contact</a>
            <Link to="/privacy">Privacy</Link>
          </div>
          <div>
            <strong>Need immediate help?</strong>
            <p>
              If you or someone else is in immediate danger, contact your local emergency service.
            </p>
            <Link to="/safety" className="footer-help">
              View urgent support
            </Link>
          </div>
        </div>
        <div className="content-wrap footer-bottom">
          <span>© 2025 WellPath AI. Demonstration product by STRATIFY.</span>
          <span>Not a crisis service or diagnostic tool.</span>
        </div>
      </footer>
    </>
  );
}

export function AuthPage({ mode }: { mode: "login" | "signup" | "recover" }) {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [consent, setConsent] = useState(false);
  const copy = {
    login: ["Welcome back", "Sign in to continue your wellbeing journey."],
    signup: ["Create your private space", "Start with a secure account. You choose what to share."],
    recover: ["Reset your password", "We’ll send secure reset instructions if an account exists."],
  }[mode];
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (mode === "recover") setSubmitted(true);
    else navigate("/dashboard");
  };
  return (
    <div className="auth-page">
      <div className="auth-aside">
        <Eyebrow>Private by design</Eyebrow>
        <h2>Your wellbeing information is personal. We keep it that way.</h2>
        <div className="auth-points">
          <p>
            <LockKeyhole /> Encrypted and protected
          </p>
          <p>
            <ShieldCheck /> Never shared with employers
          </p>
          <p>
            <UserRound /> You control consent and deletion
          </p>
        </div>
      </div>
      <div className="auth-card">
        <Link to="/" className="back-link">
          <ArrowLeft size={17} /> Back to home
        </Link>
        <h1>{copy[0]}</h1>
        <p>{copy[1]}</p>
        {submitted ? (
          <div className="success-panel">
            <CheckCircle2 />
            <h3>Check your inbox</h3>
            <p>If an account matches that email, reset instructions are on the way.</p>
            <Link to="/login" className="button button-primary">
              Return to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} className="form-stack">
            {mode === "signup" && (
              <label>
                Full name
                <input required autoComplete="name" placeholder="Your name" />
              </label>
            )}
            <label>
              Email address
              <input required type="email" autoComplete="email" placeholder="you@example.com" />
            </label>
            {mode !== "recover" && (
              <label>
                Password
                <input
                  required
                  minLength={8}
                  type="password"
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder="At least 8 characters"
                />
              </label>
            )}
            {mode === "signup" && (
              <label className="check-control">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />
                <span>
                  I agree to the <Link to="/privacy">privacy notice</Link>. I understand that
                  wellbeing information is optional and requires separate consent.
                </span>
              </label>
            )}
            <button className="button button-primary full-button" type="submit">
              {mode === "login"
                ? "Sign in securely"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset instructions"}
            </button>
          </form>
        )}
        {!submitted && (
          <div className="auth-switch">
            {mode === "login" ? (
              <>
                New to WellPath? <Link to="/signup">Create an account</Link>
              </>
            ) : mode === "signup" ? (
              <>
                Already have an account? <Link to="/login">Sign in</Link>
              </>
            ) : (
              <Link to="/login">Return to sign in</Link>
            )}
          </div>
        )}
        {mode === "login" && (
          <Link className="forgot-link" to="/recover">
            Forgot password?
          </Link>
        )}
      </div>
    </div>
  );
}

function PageHeader({
  eyebrow,
  title,
  text,
  action,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-header">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className="page-header-row">
        <div>
          <h1>{title}</h1>
          {text && <p>{text}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}

function DemoNotice() {
  return (
    <div className="demo-notice">
      <Sparkles size={16} />
      <span>
        <strong>Demonstration data</strong> — The information shown here is fictional and is not a
        clinical record.
      </span>
    </div>
  );
}

export function DashboardPage() {
  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Monday, 14 October"
        title="Good morning, Alex."
        text="Take a moment to check in, or pick up where you left off."
        action={
          <button className="icon-button" aria-label="Notifications">
            <Bell />
          </button>
        }
      />
      <DemoNotice />
      <div className="dashboard-grid">
        <section className="checkin-panel">
          <div>
            <span className="icon-tile light">
              <MessageCircleHeart />
            </span>
            <span className="pill">About 3 minutes</span>
          </div>
          <h2>How have you been feeling lately?</h2>
          <p>A short reflection can help you notice changes. Your answers remain private.</p>
          <ButtonLink to="/assessment">
            Start today’s check-in <ArrowRight size={17} />
          </ButtonLink>
          <small>Optional · Leave at any time · Not a diagnosis</small>
        </section>
        <section className="dashboard-card">
          <div className="card-title">
            <div>
              <span className="overline">WELLBEING TREND</span>
              <h3>Your recent pattern</h3>
            </div>
            <Link to="/insights">View insights</Link>
          </div>
          <div className="chart" aria-label="Sample wellbeing score trend from May to October">
            <div className="chart-lines">
              <i />
              <i />
              <i />
            </div>
            <svg viewBox="0 0 500 150" preserveAspectRatio="none">
              <path
                className="chart-area"
                d="M0,118 C70,105 90,72 150,83 S255,118 310,71 S415,39 500,31 L500,150 L0,150Z"
              />
              <path
                className="chart-line"
                d="M0,118 C70,105 90,72 150,83 S255,118 310,71 S415,39 500,31"
              />
              <circle cx="500" cy="31" r="6" />
            </svg>
            <div className="chart-labels">
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
            </div>
          </div>
          <p className="card-note">
            <span className="status-dot" /> Your recent check-ins have been relatively steady.
            Patterns are descriptive, not diagnostic.
          </p>
        </section>
        <section className="dashboard-card wide">
          <div className="card-title">
            <div>
              <span className="overline">RECOMMENDED NEXT STEP</span>
              <h3>Explore a conversation with primary care</h3>
            </div>
            <span className="pill mint">Good starting point</span>
          </div>
          <div className="recommend-row">
            <span className="large-icon">
              <HeartHandshake />
            </span>
            <p>
              A primary care professional can listen, discuss what you’ve noticed, and help you
              understand your options. You remain in control of what happens next.
            </p>
            <ButtonLink to="/support" secondary>
              View option <ChevronRight size={17} />
            </ButtonLink>
          </div>
        </section>
        <section className="dashboard-card">
          <div className="card-title">
            <h3>Recent check-ins</h3>
            <Link to="/insights">View all</Link>
          </div>
          <div className="history-list">
            <div>
              <CalendarDays />
              <span>
                <strong>7 October</strong>
                <small>Check-in completed</small>
              </span>
              <b>Steady</b>
            </div>
            <div>
              <CalendarDays />
              <span>
                <strong>23 September</strong>
                <small>Check-in completed</small>
              </span>
              <b>Some strain</b>
            </div>
          </div>
        </section>
        <section className="dashboard-card">
          <div className="card-title">
            <h3>Support follow-up</h3>
            <Link to="/follow-up">Manage</Link>
          </div>
          <div className="follow-card">
            <span className="icon-tile">
              <Phone />
            </span>
            <div>
              <span className="pill amber">Requested</span>
              <strong>Wellbeing adviser call</strong>
              <small>Follow-up planned for 18 October</small>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const questions = [
  "Over the past week, how often have you felt able to manage day-to-day demands?",
  "How often have you felt connected to the people or activities that matter to you?",
  "How often have you had enough energy for the things you needed to do?",
  "How often have you been able to rest or switch off when you wanted to?",
];
const answers = ["Not at all", "On a few days", "On several days", "On most days"];

export function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState<number[]>([]);
  
const [started, setStarted] = useState(false);
const [saving, setSaving] = useState(false);
const [saveError, setSaveError] = useState("");
const [checkInSaved, setCheckInSaved] = useState(false);
const navigate = useNavigate();

const saveAssessment = async () => {
  setSaving(true);
  setSaveError("");

  try {
    const consent = localStorage.getItem("wellpath-consent-settings");

const settings = consent ? JSON.parse(consent) : {
  checkins: true,
};

if (!settings.checkins) {
  setStep(questions.length);
  return;
}

    const response = await fetch("http://127.0.0.1:8000/check-ins", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
  mood: "Assessment completed",
  note: responses
    .map((answer, index) => `Q${index + 1}: ${answers[answer]}`)
    .join("; "),
  consent: settings.checkins,
}),
    });

    if (!response.ok) {
      throw new Error("Unable to save check-in");
    }

   setCheckInSaved(true);
setStep(step + 1);
  } catch {
    setSaveError("Could not save your check-in. Please try again.");
  } finally {
    setSaving(false);
  }
};

  if (!started)
    return (
      <div className="focus-page">
        <Link to="/dashboard" className="back-link">
          <ArrowLeft size={17} /> Leave check-in
        </Link>
        <div className="assessment-intro">
          <span className="large-icon">
            <MessageCircleHeart />
          </span>
          <Eyebrow>Wellbeing check-in</Eyebrow>
          <h1>A few questions about your recent wellbeing</h1>
          <p>
            This demonstration uses placeholder questions. A validated instrument will only be
            introduced after licensing, wording, and scoring requirements have been reviewed.
          </p>
          <div className="info-box">
            <CircleHelp />
            <div>
              <strong>This is not a diagnosis.</strong>
              <span>
                Your answers can help you reflect on patterns, but cannot determine a mental health
                condition or replace a professional assessment.
              </span>
            </div>
          </div>
          <ul className="intro-list">
            <li>
              <Clock3 /> About 3 minutes
            </li>
            <li>
              <ShieldCheck /> Private to your account
            </li>
            <li>
              <ArrowLeft /> Leave at any time
            </li>
          </ul>
          <button className="button button-primary" onClick={() => setStarted(true)}>
            Begin check-in <ArrowRight size={17} />
          </button>
        </div>
      </div>
    );
  if (step >= questions.length)
    return (
      <div className="focus-page">
        <div className="result-card">
          <span className="result-check">
            <Check />
          </span>
          <Eyebrow>Check-in complete</Eyebrow>
          <h1>Thank you for taking a moment for yourself.</h1>
          <p>
  {checkInSaved
    ? "Your responses have been saved to your demonstration timeline."
    : "Your check-in is complete. Your responses were not saved because storage consent is turned off."}
  {" "}A single check-in cannot diagnose a condition or predict risk.
</p>
          <div className="result-summary">
            <strong>What you can do next</strong>
            <span>
              Look at changes over time, or explore human support if something feels difficult or
              persistent.
            </span>
          </div>
          <div className="button-row centered-row">
            <ButtonLink to="/insights">View your insights</ButtonLink>
            <ButtonLink to="/support" secondary>
              Explore support
            </ButtonLink>
          </div>
        </div>
      </div>
    );
  const choose = (index: number) => {
    const next = [...responses];
    next[step] = index;
    setResponses(next);
  };
  return (
    <div className="focus-page">
      <div className="assessment-top">
        <button className="back-link plain" onClick={() => navigate("/dashboard")}>
          <X size={18} /> Leave check-in
        </button>
        <span>
          Question {step + 1} of {questions.length}
        </span>
      </div>
      <div className="progress-track">
        <span style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="question-card">
        <Eyebrow>Thinking about the past 7 days</Eyebrow>
        <h1>{questions[step]}</h1>
        <p>Choose the answer that feels closest. There is no right or wrong response.</p>
        <div className="answer-list">
          {answers.map((answer, index) => (
            <button
              key={answer}
              className={cn("answer-option", responses[step] === index && "selected")}
              onClick={() => choose(index)}
            >
              <span>{answer}</span>
              <i>{responses[step] === index && <Check size={16} />}</i>
            </button>
          ))}
        </div>
        {saveError && <p role="alert">{saveError}</p>}
        <div className="question-actions">
          <button
            className="button button-ghost"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            <ArrowLeft size={17} /> Back
          </button>
          <button
            className="button button-primary"
            disabled={responses[step] === undefined || saving}
           onClick={() => {
  if (step === questions.length - 1) {
    saveAssessment();
  } else {
    setStep(step + 1);
  }
}}
          >
            {saving ? "Saving..." : step === questions.length - 1 ? "Finish check-in" : "Continue"}{" "}
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
      <p className="assessment-footnote">
        <LockKeyhole size={14} /> Your response is saved only when you continue.
      </p>
    </div>
  );
}

export function InsightsPage() {
    type CheckIn = {
    id: number;
    mood: string;
    note: string;
    created_at: string;
  };

  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCheckIns = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/check-ins");

        if (!response.ok) {
          throw new Error("Could not load check-ins");
        }

        const data: CheckIn[] = await response.json();
        setCheckIns(data);
      } catch {
        setError("Unable to load your check-ins. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCheckIns();
  }, []);
  const [period, setPeriod] = useState("6 months");
    const filteredCheckIns = checkIns.filter((item) => {
    const checkInDate = new Date(item.created_at);
    const today = new Date();

    const months = Number(period.split(" ")[0]);
    const startDate = new Date();
    startDate.setMonth(today.getMonth() - months);

    return checkInDate >= startDate && checkInDate <= today;
  });
  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Your wellbeing"
        title="Patterns, with perspective."
        text="Review your demonstration check-ins over time. These patterns are descriptive and are not a diagnosis."
        action={
          <select
            className="select-control"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option>3 months</option>
            <option>6 months</option>
            <option>12 months</option>
          </select>
        }
      />
      <section className="dashboard-card full-card">
  <span className="overline">SAVED CHECK-INS</span>
  <h3>Your assessment history</h3>

  {loading && <p>Loading your check-ins...</p>}

  {error && <p role="alert">{error}</p>}

  {!loading && !error && filteredCheckIns.length === 0 && (
    <p>No check-ins saved yet. Complete an assessment to see it here.</p>
  )}

  {!loading && !error && filteredCheckIns.map((item) => (
    <div key={item.id} className="pattern-callout">
      <div>
        <strong>{item.mood}</strong>
        <span>{new Date(item.created_at).toLocaleString()}</span>
        <p>{item.note}</p>
      </div>
    </div>
  ))}
</section>
      <div className="insight-grid">
        
        <section className="dashboard-card">
          <span className="overline">REFLECTION PROMPT</span>
          <h3>What helped on steadier days?</h3>
          <p>
            Noticing people, places, or routines that support you can make future conversations more
            useful.
          </p>
          <ButtonLink to="/journal" secondary>
            Write privately
          </ButtonLink>
        </section>
        <section className="dashboard-card full-card support-prompt">
          <span className="large-icon">
            <UsersRound />
          </span>
          <div>
            <h3>Patterns can be useful, but you don’t need to interpret them alone.</h3>
            <p>
              If changes are worrying, persistent, or affecting daily life, consider talking with a
              qualified professional.
            </p>
          </div>
          <ButtonLink to="/support">Explore human support</ButtonLink>
        </section>
      </div>
    </div>
  );
}

const supportOptions = [
  {
    icon: BookOpen,
    title: "Guided self-help resources",
    type: "Self-guided",
    text: "Evidence-informed reading and structured exercises you can use at your own pace.",
    why: "Useful for early reflection and practical coping ideas.",
    access: "Available online · No referral needed",
    handoff: false,
  },
  {
    icon: UsersRound,
    title: "Community wellbeing service",
    type: "Community",
    text: "Local peer and wellbeing programmes delivered by trained community teams.",
    why: "May help if connection, routine, or practical support would feel useful.",
    access: "Local availability must be verified",
    handoff: true,
  },
  {
    icon: HeartHandshake,
    title: "Primary healthcare conversation",
    type: "Healthcare",
    text: "Speak with a primary care professional about what you have noticed and possible next steps.",
    why: "A good starting point when changes persist or affect everyday life.",
    access: "Contact your registered practice",
    handoff: true,
  },
  {
    icon: MessageCircleHeart,
    title: "Licensed mental health professional",
    type: "Professional",
    text: "Explore therapy or counselling with a qualified, licensed practitioner.",
    why: "May be relevant when you want structured, ongoing human support.",
    access: "Eligibility and cost vary by provider",
    handoff: true,
  },
];

export function SupportPage() {
  const [filter, setFilter] = useState("All options");
  const filters = ["All options", "Self-guided", "Community", "Healthcare", "Professional"];
  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Support navigator"
        title="Find support that fits you."
        text="Explore clear, practical options. WellPath explains choices—it does not make clinical decisions."
        action={
          <Link to="/safety" className="button button-urgent">
            <Phone size={17} /> I need urgent help
          </Link>
        }
      />
      <div className="navigator-intro">
        <div>
          <Sparkles />
        </div>
        <div>
          <h3>You choose the path. Human help stays central.</h3>
          <p>
            Recommendations use demonstration information and general preferences. Always verify
            provider details, availability, eligibility, and professional credentials before access.
          </p>
        </div>
      </div>
      <div className="filter-row" aria-label="Filter support options">
        {filters.map((item) => (
          <button
            key={item}
            className={cn("filter-chip", filter === item && "active")}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="support-list">
        {supportOptions
          .filter((x) => filter === "All options" || x.type === filter)
          .map(({ icon: Icon, ...item }) => (
            <article className="support-option" key={item.title}>
              <span className="large-icon">
                <Icon />
              </span>
              <div className="support-body">
                <span className="pill">{item.type}</span>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
                <div className="why-row">
                  <CircleHelp />
                  <span>
                    <strong>Why this may be relevant</strong>
                    {item.why}
                  </span>
                </div>
                <div className="access-row">
                  <Clock3 />
                  <span>{item.access}</span>
                  {item.handoff && (
                    <b>
                      <UserRound /> Human hand-off available
                    </b>
                  )}
                </div>
              </div>
              <button
                className="button button-secondary"
                onClick={() =>
                  alert(`Demo only: access details for ${item.title} would open here.`)
                }
              >
                View access details <ChevronRight size={17} />
              </button>
            </article>
          ))}
      </div>
      <div className="safety-callout">
        <Phone />
        <div>
          <strong>In immediate danger or unable to stay safe?</strong>
          <span>
            Do not wait for an online response. Contact your local emergency service now or go to
            the nearest emergency department.
          </span>
        </div>
        <Link to="/safety">See urgent support options</Link>
      </div>
    </div>
  );
}

export function SafetyPage() {
  const [trusted, setTrusted] = useState(false);
  return (
    <div className="app-page safety-page">
      <PageHeader
        eyebrow="Urgent support"
        title="You deserve immediate, human support."
        text="WellPath AI is not a crisis service. Choose the option that best matches what is happening right now."
      />
      <section className="danger-panel">
        <Phone />
        <div>
          <h2>If you or someone else is in immediate danger</h2>
          <p>
            Call your local emergency number now or go to the nearest emergency department. If you
            can, move to a safer place and stay with someone you trust.
          </p>
        </div>
        <a className="button button-light" href="tel:112">
          Call emergency services
        </a>
      </section>
      <div className="safety-grid">
        <section className="safety-card">
          <span className="large-icon">
            <MessageCircleHeart />
          </span>
          <h2>Contact a crisis support line</h2>
          <p>
            Speak with a trained human responder. Find the verified crisis line for your current
            country or region.
          </p>
          <a
            href="https://findahelpline.com/"
            target="_blank"
            rel="noreferrer"
            className="button button-secondary"
          >
            Find a verified helpline <ArrowRight size={17} />
          </a>
          <small>Opens Find A Helpline in a new tab. Availability varies by location.</small>
        </section>
        <section className="safety-card">
          <span className="large-icon">
            <UsersRound />
          </span>
          <h2>Reach someone you trust</h2>
          <p>
            Contact a friend, family member, carer, or colleague and tell them clearly that you need
            support now.
          </p>
          <button className="button button-secondary" onClick={() => setTrusted(!trusted)}>
            {trusted ? "Message outline opened" : "Plan what to say"} <ChevronDown size={17} />
          </button>
          {trusted && (
            <div className="message-template">
              “I’m having a difficult time and I don’t want to be alone right now. Could you stay
              with me or help me contact support?”
            </div>
          )}
        </section>
        <section className="safety-card">
          <span className="large-icon">
            <HeartHandshake />
          </span>
          <h2>Seek urgent healthcare</h2>
          <p>
            Contact an urgent health service, your primary care team, or visit an urgent care
            facility for an in-person assessment.
          </p>
          <button
            className="button button-secondary"
            onClick={() =>
              alert("In a connected product, verified local urgent care options would appear here.")
            }
          >
            View healthcare options
          </button>
          <small>Demo only. Local service details must be verified before display.</small>
        </section>
      </div>
      <div className="plain-notice">
        <ShieldCheck />
        <span>
          <strong>About privacy in urgent situations</strong>WellPath does not automatically monitor
          journal entries or ordinary mood scores, and it does not predict suicide risk from them.
          Emergency services are not automatically contacted.
        </span>
      </div>
    </div>
  );
}

type JournalEntry = { id: number; date: string; mood: string; text: string };

export function JournalPage() {
 
  const [entries, setEntries] = useState<JournalEntry[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [saving, setSaving] = useState(false);
useEffect(() => {
  const loadEntries = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/journal");

      if (!response.ok) {
        throw new Error("Could not load journal entries");
      }

      const data = await response.json();

      setEntries(
        data.map((item: {
          id: number;
          title: string;
          content: string;
          created_at: string;
        }) => ({
          id: item.id,
          date: new Date(item.created_at).toLocaleDateString(),
          mood: item.title,
          text: item.content,
        }))
      );
    } catch {
      setError("Unable to load journal entries. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  loadEntries();
}, []);
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [draft, setDraft] = useState("");
  const [mood, setMood] = useState("Steady");
  const save = async () => {

  if (!draft.trim()) return;

  setSaving(true);
  setError("");

  try {
    const isNew = editing === "new";

    const url = isNew
      ? "http://127.0.0.1:8000/journal"
      : `http://127.0.0.1:8000/journal/${editing}`;

    const response = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: mood,
        content: draft,
      }),
    });

    if (!response.ok) {
      throw new Error("Could not save entry");
    }

    const item = await response.json();

    const updatedEntry = {
      id: item.id,
      date: new Date(item.created_at).toLocaleDateString(),
      mood: item.title,
      text: item.content,
    };

    if (isNew) {
      setEntries((previous) => [updatedEntry, ...previous]);
    } else {
      setEntries((previous) =>
        previous.map((entry) =>
          entry.id === item.id ? updatedEntry : entry
        )
      );
    }

    setEditing(null);
    setDraft("");
  } catch {
    setError("Unable to save your entry. Please try again.");
  } finally {
    setSaving(false);
  }
};

  const beginEdit = (entry?: JournalEntry) => {
    setEditing(entry?.id ?? "new");
    setDraft(entry?.text ?? "");
    setMood(entry?.mood ?? "Steady");
  };
  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Private journal"
        title="A space that’s yours."
        text="Capture thoughts and mood notes privately. Journal content is not shared with support providers by default."
        action={
          <button className="button button-primary" onClick={() => beginEdit()}>
            <Plus size={17} /> New entry
          </button>
        }
      />
      <div className="plain-notice">
        <LockKeyhole />
        <span>
          <strong>Demo storage</strong>
Journal entries are saved in the local WellPath demo database.
This version does not include account-based access controls or encryption.
Avoid entering sensitive personal information.
        </span>
      </div>
      {editing !== null && (
        <section className="editor-card">
          <div className="card-title">
            <h2>{editing === "new" ? "New journal entry" : "Edit entry"}</h2>
            <button
              className="icon-button"
              onClick={() => setEditing(null)}
              aria-label="Close editor"
            >
              <X />
            </button>
          </div>
          <label>
            How does today feel?
            <select value={mood} onChange={(e) => setMood(e.target.value)}>
              <option>Steady</option>
              <option>Mixed</option>
              <option>Low</option>
              <option>Good</option>
              <option>Prefer not to say</option>
            </select>
          </label>
          <label>
            Private reflection
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write whatever feels useful..."
              rows={6}
            />
          </label>
          <div className="question-actions">
            <button className="button button-ghost" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <button
  className="button button-primary"
  onClick={save}
  disabled={saving}
>
  {saving ? "Saving..." : "Save private entry"}
</button>
          </div>
        </section>
      )}
      <div className="journal-grid">
        {entries.map((entry) => (
          <article className="journal-card" key={entry.id}>
            <div className="journal-date">
              <CalendarDays />
              <span>{entry.date}</span>
              <span className="pill">{entry.mood}</span>
            </div>
            <p>{entry.text}</p>
            <div>
              <button onClick={() => beginEdit(entry)}>Edit</button>
              <button
  className="delete-link"
  onClick={async () => {
    const confirmed = window.confirm("Delete this journal entry?");

    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/journal/${entry.id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Could not delete entry");
      }

      setEntries((previous) =>
        previous.filter((e) => e.id !== entry.id)
      );
    } catch {
      setError("Unable to delete this entry. Please try again.");
    }
  }}
>
  <Trash2 size={15} /> Delete
</button>
            </div>
          </article>
        ))}
        {loading && <p>Loading journal entries...</p>}
{error && <p role="alert">{error}</p>}

        {!loading && !entries.length && (
          <div className="empty-state">
            <BookOpen />
            <h3>Your journal is empty</h3>
            <p>Add a private reflection whenever it feels useful.</p>
          </div>
        )}
      </div>
    </div>
  );
}
function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      className={cn("toggle", checked && "on")}
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
    >
      <span />
    </button>
  );
}

export function PrivacyPage() {
  const [settings, setSettings] = useState(() => {
  try {
    const saved = localStorage.getItem("wellpath-consent-settings");

    if (saved) {
      return {
        checkins: true,
        personalisation: true,
        reminders: false,
        research: false,
        ...JSON.parse(saved),
      };
    }
  } catch {
    // Use default settings if saved data cannot be read.
  }

  return {
    checkins: true,
    personalisation: true,
    reminders: false,
    research: false,
  };
});

useEffect(() => {
  localStorage.setItem(
    "wellpath-consent-settings",
    JSON.stringify(settings)
  );
}, [settings]);

  const [deletion, setDeletion] = useState(false);
  const flip = (key: keyof typeof settings) => setSettings({ ...settings, [key]: !settings[key] });
  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Privacy & consent"
        title="You decide what happens with your data."
        text="Review permissions, change your mind, and understand what is collected and why."
      />
      <div className="privacy-overview">
        <ShieldCheck />
        <div>
          <h2>Understand your privacy settings</h2>
<p>
  This is a demonstration platform. Account-based access controls
  and production privacy protections are not yet implemented.
  Avoid entering sensitive personal information.
</p>
        </div>
        <span className="pill mint">
          Demo mode
        </span>
      </div>
      <div className="privacy-grid">
        <section className="dashboard-card wide">
          <div className="card-title">
            <div>
              <span className="overline">PERMISSIONS</span>
              <h3>Consent controls</h3>
            </div>
          </div>
          {[
            [
              "checkins",
              "Store wellbeing check-ins",
              "Required to show your history and patterns. Turning this off removes future history.",
            ],
            [
              "personalisation",
              "Personalised support suggestions",
              "Uses your stated preferences to order general support options.",
            ],
            [
              "reminders",
              "Optional check-in reminders",
              "Receive reminders you schedule. Off by default.",
            ],
            [
              "research",
              "Contribute de-identified data to research",
              "Optional. No data is shared in this demonstration. Off by default.",
            ],
          ].map(([key, title, text]) => (
            <div className="permission-row" key={key}>
              <div>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
              <Toggle
                checked={settings[key as keyof typeof settings]}
                onChange={() => flip(key as keyof typeof settings)}
                label={title}
              />
            </div>
          ))}
          <p className="consent-note">
            You can revoke optional consent at any time. Revoking consent does not affect processing
            that already occurred lawfully.
          </p>
        </section>
        <section className="dashboard-card">
          <span className="icon-tile">
            <FileText />
          </span>
          <h3>Access your data</h3>
          <p>See what information is associated with your account and request a portable copy.</p>
          <button
            className="button button-secondary"
            onClick={() => alert("Demo only: a secure data export would be prepared here.")}
          >
            Request data copy
          </button>
        </section>
        <section className="dashboard-card">
          <span className="icon-tile">
            <LockKeyhole />
          </span>
          <h3>Account security</h3>
          <p>Update your password and review active account sessions.</p>
          <button
            className="button button-secondary"
            onClick={() => alert("Demo only: account security settings would open here.")}
          >
            Review security
          </button>
        </section>
        <section className="dashboard-card full-card danger-zone">
          <div>
            <span className="overline">ACCOUNT & DATA</span>
            <h3>Delete your account and wellbeing data</h3>
            <p>
              Start a verified request to permanently delete your account, check-ins, journal
              entries, and preferences. Legal retention requirements would be explained before
              confirmation.
            </p>
          </div>
          <button className="button button-danger-outline" onClick={() => setDeletion(true)}>
            Request deletion
          </button>
        </section>
      </div>
      {deletion && (
        <div className="modal-backdrop" role="presentation">
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="delete-title">
            <span className="large-icon danger">
              <Trash2 />
            </span>
            <h2 id="delete-title">Request account deletion?</h2>
            <p>
              This is a demonstration. No real data will be deleted. A live product would require
              identity verification and explain any required retention period.
            </p>
            <div className="button-row">
              <button className="button button-ghost" onClick={() => setDeletion(false)}>
                Cancel
              </button>
              <button className="button button-danger" onClick={() => setDeletion(false)}>
                Submit demo request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const statusSteps = ["Not Started", "Requested", "Connected", "Follow-up Completed"];

export function FollowUpPage() {
  const [status, setStatus] = useState(() =>
  Number(localStorage.getItem("wellpath-followup-status") ?? 1)
);

const [reminder, setReminder] = useState(() =>
  localStorage.getItem("wellpath-followup-reminder") !== "false"
);
const [experience, setExperience] = useState(() =>
  localStorage.getItem("wellpath-followup-experience") ?? ""
);
useEffect(() => {
  localStorage.setItem("wellpath-followup-status", String(status));
  localStorage.setItem("wellpath-followup-reminder", String(reminder));
  localStorage.setItem("wellpath-followup-experience", experience);
}, [status, reminder, experience]);

  return (
    <div className="app-page">
      <PageHeader
        eyebrow="Your chosen pathway"
        title="Keep track, on your terms."
        text="Record progress and optional reminders. This demonstration does not contact a provider."
      />
      <DemoNotice />
      <section className="pathway-card">
        <div className="pathway-head">
          <span className="large-icon">
            <HeartHandshake />
          </span>
          <div>
            <span className="pill">Primary healthcare</span>
            <h2>Wellbeing adviser conversation</h2>
            <p>Selected on 10 October 2025</p>
          </div>
          <button
            className="button button-secondary"
            onClick={() => alert("Demo only: support details would open here.")}
          >
            View support details
          </button>
        </div>
        <div className="status-progress">
          {statusSteps.map((label, index) => (
            <button
              key={label}
              onClick={() => setStatus(index)}
              className={cn(index <= status && "complete", index === status && "current")}
            >
              <i>{index < status ? <Check /> : index + 1}</i>
              <span>{label}</span>
            </button>
          ))}
        </div>
        <div className="follow-details">
          <div>
            <span className="overline">CURRENT STATUS</span>
            <strong>{statusSteps[status]}</strong>
            <p>
              {status === 0
                ? "You have not started this pathway."
                : status === 1
                  ? "Your demonstration request is recorded. No provider has been contacted."
                  : status === 2
                    ? "You have marked that a connection was made."
                    : "You have marked this pathway complete."}
            </p>
          </div>
          <div>
  <span className="overline">NEXT FOLLOW-UP</span>
  <strong>Not scheduled</strong>
  <p>Review your progress whenever you choose. No appointment is scheduled in this demonstration.</p>
</div>
          <div>
            <span className="overline">REMINDER</span>
            <div className="inline-toggle">
              <strong>{reminder ? "On" : "Off"}</strong>
              <Toggle
                checked={reminder}
                onChange={() => setReminder(!reminder)}
                label="Follow-up reminder"
              />
            </div>
            <p>
  This saves your reminder preference only. No notification is scheduled in this demonstration.
</p>
          </div>
        </div>
      </section>
      <section className="experience-card">
        <div>
          <Eyebrow>Optional reflection</Eyebrow>
          <h2>How has this support pathway felt so far?</h2>
          <p>
            Your experience can help you decide whether to continue, change direction, or seek
            another form of support.
          </p>
        </div>
        <div className="experience-options">
          {["Not useful", "Unsure", "Somewhat useful", "Useful"].map((x) => (
            <button
              className={cn(experience === x && "active")}
              onClick={() => setExperience(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function NotFoundPage() {
  return (
    <div className="not-found">
      <span className="large-icon">
        <Route />
      </span>
      <h1>This path doesn’t exist</h1>
      <p>Return to your WellPath overview or explore support.</p>
      <ButtonLink to="/dashboard">Go to overview</ButtonLink>
    </div>
  );
}
