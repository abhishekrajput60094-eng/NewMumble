import { useEffect, useState, type FC } from "react";
import "./MumbleLandingRedesign.css";

const Logo = "/favicon.svg";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Powered By", href: "#powered-by" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Tokenomics", href: "#tokenomics" },
  { label: "FAQs", href: "#faqs" },
];

const featureCards = [
  {
    title: "End-to-End Encryption",
    copy: "Messages stay encrypted from your wallet to your recipient, secured by Ramestta-native keys.",
  },
  {
    title: "Decentralized Storage",
    copy: "All threads live on the Ramestta blockchain—immutable, censorship resistant, and verifiable.",
  },
  {
    title: "Community Owned",
    copy: "Wallets act as identity. No phone numbers, emails, or centralized gateways required.",
  },
  {
    title: "Privacy First",
    copy: "Metadata is minimized and routed over encrypted transports so conversations stay private.",
  },
  {
    title: "Lightning Fast",
    copy: "Optimized indexing and local caching deliver near-instant message sync without sacrificing security.",
  },
  {
    title: "Global Access",
    copy: "Wherever your wallet connects, your inbox follows. Ramestta availability keeps communities online.",
  },
];

const channels = [
  "0xe9..2d9",
  "jsreigns.rama",
  "0x35..1c02",
  "findus.rama",
  "0x45..db6b",
  "0xe74b..3d44",
];

const channelMessages = [
  {
    sender: "them",
    content: "Hey, are you ready for the Ramestta mainnet launch tonight?",
  },
  {
    sender: "me",
    content:
      "Absolutely. Liquidity is locked, keys rotated, infra double-checked.",
  },
  {
    sender: "them",
    content:
      "Perfect. MumbleChat notifications are pinned in the community channel.",
  },
  {
    sender: "me",
    content: "See you in the launch stream. XMTP client already synced.",
  },
];

// ...existing code...

const roadmapPhases = [
  {
    phase: "Phase I",
    title: "Core messaging launch",
    copy: "Direct wallet-to-wallet chat, encrypted storage, and Ramestta mainnet availability.",
    status: "Shipped",
  },
  {
    phase: "Phase II",
    title: "Community tooling",
    copy: "Group channels, moderation controls, and programmable bots for DAO operations.",
    status: "In progress",
  },
  {
    phase: "Phase III",
    title: "Ecosystem expansion",
    copy: "Bridged inboxes, custom themes, and liquidity programs to grow the MumbleChat network.",
    status: "Queued",
  },
];

const allocations = [
  {
    label: "Community rewards",
    percent: "40%",
    copy: "Distributed to active chat operators, moderators, and builders expanding the network.",
  },
  {
    label: "Core contributors",
    percent: "30%",
    copy: "Vested allocation aligned with long-term protocol development and maintenance.",
  },
  {
    label: "Liquidity & treasury",
    percent: "20%",
    copy: "Supports exchange liquidity, partnerships, and ongoing infrastructure costs.",
  },
  {
    label: "Ecosystem grants",
    percent: "10%",
    copy: "Fund experimentation across wallets, clients, and integrations on Ramestta.",
  },
];

const faqItems = [
  {
    question: "Do I need a specific wallet to use MumbleChat?",
    answer:
      "Any wallet supported on Ramestta works. Connect, approve the session, and your encrypted inbox syncs immediately.",
  },
  {
    question: "How is my data stored?",
    answer:
      "Messages are sealed with XMTP encryption and anchored to Ramestta storage. Only the intended participants can decrypt them.",
  },
  {
    question: "Can communities customize the chat experience?",
    answer:
      "Yes. Roles, channel permissions, and bot automations are all configurable so DAOs can tailor their workspace.",
  },
  {
    question: "Is there a cost to send messages?",
    answer:
      "Ramestta keeps fees minimal. MumbleChat batches writes where possible so everyday messaging stays affordable.",
  },
];

const classNames = (...values: Array<string | false | undefined>) =>
  values.filter(Boolean).join(" ");

export const MumbleLanding: FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navClass = classNames("navbar", scrolled && "navbar-scrolled");

  return (
    <div className="page" style={{paddingRight:"10px",paddingLeft:"10px"}}>
      <div className="background" aria-hidden="true" />
      <header className={navClass}>
        <div className="nav-container">
          <a
            className="brand"
            href="#home"
            onClick={() => {
              setMenuOpen(false);
            }}>
            <img
              src={Logo}
              alt="MumbleChat Logo"
              className="brand-icon"
              style={{ height: 32, width: 32 }}
            />
            <span className="brand-label">MumbleChat</span>
          </a>
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} className="nav-link">
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <a
              className="button button-primary"
              href="http://localhost:5173/welcome">
              Connect Wallet
            </a>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mumble-mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="mobile-nav-link"
                onClick={() => {
                  setMenuOpen(false);
                }}>
                {label}
              </a>
            ))}
            <a
              className="button button-primary mobile-primary-button"
              href="http://localhost:5173/welcome"
              onClick={() => {
                setMenuOpen(false);
              }}>
              Connect Wallet
            </a>
          </nav>
        )}
      </header>

      <main className="content">
        <section className="hero section-padding" id="home">
          <div className="hero-badge">Ramestta Layer-3 Blockchain</div>
          <h1 className="hero-title">
            Institutional-grade decentralized messaging, powered by Ramestta.
          </h1>
          <p className="hero-copy">
            Ramestta is an Ethereum-aligned Layer-3 blockchain built on Polygon,
            engineered for real-world adoption with sub-2 second finality,
            65,000+ TPS, and deterministic micro-fees. Experience secure,
            censorship-resistant messaging with EVM compatibility and
            Ethereum-level trust.
          </p>
          <ul className="hero-list">
            <li>
              True Layer-3 architecture: Built on Polygon, secured by Ethereum
            </li>
            <li>Sub-2 second programmable finality</li>
            <li>Deterministic micro-fees ($0.0002-$0.001 per transaction)</li>
            <li>100% EVM equivalence for seamless migration</li>
            <li>Enterprise-grade throughput (65,000+ TPS)</li>
            <li>Production-ready for payments, gaming, DeFi, and more</li>
          </ul>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href="http://localhost:5173/welcome">
              Connect Wallet
            </a>
            <a className="button button-secondary" href="#powered-by">
              Learn More About Ramestta
            </a>
          </div>
          <p className="hero-note">
            Ramestta: The missing execution layer in Web3 infrastructure. Built
            for privacy, security, and true ownership of your communication.
          </p>
        </section>

        <section
          className="mockup-section section-padding"
          aria-labelledby="mockup-heading">
          <h2 id="mockup-heading" className="section-visually-hidden">
            Product preview
          </h2>
          <div className="mockup-container">
            <div className="mockup-top-bar">
              <div className="window-controls">
                <span />
                <span />
                <span />
              </div>
              <div className="address-bar">mumblechat.com</div>
            </div>
            <div className="mockup-body">
              <aside className="channel-column">
                <div className="channel-header">
                  <span>Chats</span>
                  <span className="channel-menu">⋮</span>
                </div>
                <div className="channel-search">Search channels...</div>
                <ul className="channel-list">
                  {channels.map((channel, index) => (
                    <li
                      key={channel}
                      className={classNames(
                        "channel-item",
                        index === 0 && "channel-item-active",
                      )}>
                      <span className="channel-avatar">
                        {channel.slice(0, 2)}
                      </span>
                      <span className="channel-label">{channel}</span>
                    </li>
                  ))}
                </ul>
              </aside>
              <div className="thread-column">
                <header className="thread-header">
                  <div>
                    <div className="thread-title">0xe9..2d9</div>
                    <div className="thread-status">Online</div>
                  </div>
                  <div className="thread-actions">
                    <span />
                    <span />
                  </div>
                </header>
                <div className="thread-messages">
                  {channelMessages.map(({ sender, content }) => (
                    <div
                      key={content}
                      className={classNames(
                        "message-row",
                        sender === "me" && "message-row-own",
                      )}>
                      <div className="message-bubble">{content}</div>
                    </div>
                  ))}
                </div>
                <div className="thread-composer">
                  Encrypted message composer
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="powered section-padding" id="powered-by">
          <div className="section-heading">
            <span className="section-eyebrow">Why Ramestta?</span>
            <h2>Institutional-Grade Layer-3 Infrastructure</h2>
            <p>
              Ramestta completes the Ethereum scalability stack—not as a
              competitor, but as the final adoption-ready Layer-3. Every
              conversation is anchored directly on the Ramestta blockchain: no
              centralized databases, no middlemen, no ads—just encrypted
              messages that you own.
            </p>
            <ul className="powered-list">
              <li>
                <strong>True Layer-3 Architecture:</strong> Built on Polygon
                (L2), secured by Ethereum (L1) for mass adoption.
              </li>
              <li>
                <strong>Sub-2 Second Finality:</strong> Programmable finality
                with instant (~2s), hard (~7-10min), and ultimate security.
              </li>
              <li>
                <strong>Deterministic Micro-Fees:</strong> Predictable
                transaction costs between $0.0002-$0.001—1000× cheaper than
                L1/L2 chains.
              </li>
              <li>
                <strong>Ethereum Security Inheritance:</strong> Inherits trust
                from Ethereum via Polygon checkpoints—economic and cryptographic
                guarantees.
              </li>
              <li>
                <strong>100% EVM Equivalence:</strong> Fully equivalent, migrate
                from Polygon/Ethereum with zero code changes.
              </li>
              <li>
                <strong>65,000+ TPS Capacity:</strong> Enterprise-grade
                throughput with horizontal scaling via multi-instance
                architecture.
              </li>
            </ul>
            <p>
              <a
                href="https://www.ramestta.com/"
                target="_blank"
                rel="noopener noreferrer">
                Learn more at ramestta.com
              </a>
            </p>
          </div>
        </section>

        <section className="features section-padding" id="features">
          <div className="section-heading">
            <span className="section-eyebrow">Why MumbleChat</span>
            <h2>Everything you need to own your conversations.</h2>
            <p>
              Privacy-first tooling, resilient infrastructure, and UI built for
              communities who live onchain.
            </p>
          </div>
          <div className="feature-grid">
            {featureCards.map((feature) => (
              <article key={feature.title} className="feature-card">
                <h3>{feature.title}</h3>
                <p>{feature.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="roadmap section-padding" id="roadmap">
          <div className="section-heading">
            <span className="section-eyebrow">Roadmap</span>
            <h2>Ship fast, stay decentralized.</h2>
            <p>
              The path to a global, wallet-native messaging layer on Ramestta.
            </p>
          </div>
          <div className="roadmap-timeline">
            {roadmapPhases.map((phase) => (
              <article key={phase.title} className="roadmap-item">
                <span className="roadmap-badge">{phase.phase}</span>
                <h3>{phase.title}</h3>
                <p>{phase.copy}</p>
                <span className="roadmap-status">{phase.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="tokenomics section-padding" id="tokenomics">
          <div className="section-heading">
            <span className="section-eyebrow">Tokenomics</span>
            <h2>Transparent allocation for network growth.</h2>
            <p>
              The MumbleChat token aligns early adopters, builders, and
              liquidity providers powering the Ramestta messaging layer.
            </p>
          </div>
          <div className="tokenomic-grid">
            {allocations.map((allocation) => (
              <article key={allocation.label} className="tokenomic-card">
                <span className="tokenomic-percent">
                  {allocation.percent}
                </span>
                <h3>{allocation.label}</h3>
                <p>{allocation.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="faqs section-padding" id="faqs">
          <div className="section-heading">
            <span className="section-eyebrow">FAQs</span>
            <h2>Answers before you connect.</h2>
          </div>
          <div className="faq-list">
            {faqItems.map((faq) => (
              <article key={faq.question} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta section-padding">
          <h2>Ready to take control of your conversations?</h2>
          <p>
            Connect your wallet to start sending encrypted messages on Ramestta.
            No emails. No phone numbers. Just you and your community.
          </p>
          <div className="cta-actions">
            <a
              className="button button-primary"
              href="http://localhost:5173/welcome">
              Connect Wallet
            </a>
            <a className="button button-secondary" href="#powered-by">
              Learn more
            </a>
          </div>
        </section>

        <section className="ramestta-info section-padding" id="ramestta-info">
          <div className="section-heading">
            <span className="section-eyebrow">
              Ramestta Layer-3 Blockchain
            </span>
            <h2>What is Ramestta?</h2>
            <p>
              Ramestta is an institutional-grade Layer-3 blockchain built on
              Polygon (L2) and aligned with Ethereum (L1). It’s engineered for
              real-world adoption, delivering sub-2 second finality,
              deterministic micro-fees, and enterprise-grade scalability—without
              compromising security, trust, or developer compatibility.
            </p>
          </div>
          <div className="ramestta-grid">
            <div className="ramestta-card">
              <div className="ramestta-card-title">
                Layered Architecture
              </div>
              <div className="ramestta-card-desc">
                <strong>L1: Ethereum</strong> — Settlement & Security
                <br />
                <strong>L2: Polygon</strong> — Scalable Execution
                <br />
                <strong>L3: Ramestta</strong> — Performance & Adoption
              </div>
            </div>
            <div className="ramestta-card">
              <div className="ramestta-card-title">
                Network Parameters
              </div>
              <div className="ramestta-card-desc">
                <strong>Type:</strong> Layer-3 (L3)
                <br />
                <strong>Chain ID:</strong> 1370
                <br />
                <strong>Block Time:</strong> ~2 seconds
                <br />
                <strong>Throughput:</strong> 65,000+ TPS
                <br />
                <strong>Gas Fee:</strong> $0.0002 - $0.001
                <br />
                <strong>Security:</strong> Ethereum-aligned PoS
              </div>
            </div>
            <div className="ramestta-card">
              <div className="ramestta-card-title">
                Endpoints & Explorer
              </div>
              <div className="ramestta-card-desc">
                <strong>RPC:</strong> blockchain.ramestta.com
                <br />
                <strong>RPC2:</strong> blockchain2.ramestta.com
                <br />
                <strong>Explorer:</strong> ramascan.com
                <br />
                <strong>Bridge:</strong> ramabridge.com
                <br />
                <strong>Swap DApp:</strong> ramaswap.com
              </div>
            </div>
            <div className="ramestta-card">
              <div className="ramestta-card-title">Ready to Build?</div>
              <div className="ramestta-card-desc">
                Ramestta powers payments, gaming, DeFi, and national digital
                infrastructure—today.
                <br />
                Zero code changes, zero migration friction, Ethereum-level
                security, and Web2-level performance.
                <br />
                <a
                  href="https://www.ramestta.com/"
                  target="_blank"
                  rel="noopener noreferrer">
                  Learn more at ramestta.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img
            src={Logo}
            alt="MumbleChat Logo"
            className="brand-icon"
            style={{ height: 32, width: 32 }}
          />
          <div>
            <p className="brand-label">MumbleChat</p>
            <p className="footer-copy">
              Secure, decentralized messaging powered by the Ramestta
              blockchain.
            </p>
          </div>
        </div>
        <div className="footer-links">
          <div>
            <h3>Product</h3>
            <a href="#features">Features</a>
            <a href="#roadmap">Roadmap</a>
            <a href="#tokenomics">Tokenomics</a>
          </div>
          <div>
            <h3>Resources</h3>
            <a href="https://docs.xmtp.org/" target="_blank" rel="noreferrer">
              Documentation
            </a>
            <a
              href="https://community.xmtp.org/"
              target="_blank"
              rel="noreferrer">
              Community
            </a>
            <a href="#faqs">FAQs</a>
          </div>
        </div>
        <div className="footer-meta">
          <span>
            © {new Date().getFullYear()} MumbleChat. Built on Ramestta.
          </span>
          <div>
            <a href="#powered-by">Terms</a>
            <a href="#powered-by">Privacy</a>
            <a href="#powered-by">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
