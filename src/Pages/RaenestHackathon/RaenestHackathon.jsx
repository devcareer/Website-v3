import React, { useState } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import './RaenestHackathon.css';
import upworkLogoGreen from '../../assets/Images/upwork-logo.svg';
import upworkLogoWhite from '../../assets/Images/upwork-logo-white.svg';

/* ──────────── Upwork Logo Component ──────────── */
const UpworkLogo = ({ width = 120, className = '', variant = 'dark' }) => (
  <img
    className={className}
    src={variant === 'light' ? upworkLogoWhite : upworkLogoGreen}
    alt="Upwork"
    style={{ width, height: 'auto', display: 'block' }}
  />
);

const TRACKS = [
  {
    title: 'Design',
    icon: '🎨',
    iconClass: 'rn-track-card__icon--design',
    description:
      'Bring ideas to life with stunning visuals. Create UI/UX designs, brand assets, and marketing materials with AI tools to supercharge your workflow.',
    tasks: 'UI mockups, branding kits, social media assets, presentation designs',
  },
  {
    title: 'Writing',
    icon: '✍️',
    iconClass: 'rn-track-card__icon--writing',
    description:
      'Craft compelling content that connects. Write articles, copy, scripts, and documentation leverage AI to research faster and write better.',
    tasks: 'Blog posts, copywriting, technical docs, content strategy',
  },
  {
    title: 'Coding',
    icon: '💻',
    iconClass: 'rn-track-card__icon--coding',
    description:
      'Build real products and ship features. Develop web apps, APIs, and tools — with AI as your pair-programming partner to code smarter and faster.',
    tasks: 'Web apps, APIs, automation tools, open-source contributions',
  },
];

const STEPS = [
  {
    number: 1,
    title: 'Create Your Upwork Account',
    description:
      'Sign up on Upwork and set up your freelancer profile. This is your gateway to real, paid tasks in the hackathon.',
  },
  {
    number: 2,
    title: 'Connect Upwork to Raenest',
    description:
      'Link your Upwork account to Raenest — Africa\'s largest Upwork partner for instant, seamless withdrawals to your Nigerian bank account.',
  },
  {
    number: 3,
    title: 'Complete Tasks & Get Paid',
    description:
      'Pick tasks in your track (Design, Writing, or Coding), complete them on Upwork, and withdraw your earnings via Raenest — fast and hassle-free.',
  },
];

const FAQS = [
  {
    question: 'Who can participate in the Raenest Hackathon?',
    answer:
      'Anyone in Africa with skills in design, writing, or coding can participate! Whether you\'re a beginner or seasoned professional, there are Upwork tasks for every skill level. AI tools are encouraged to help you produce your best work.',
  },
  {
    question: 'Why do I need both an Upwork and Raenest account?',
    answer:
      'All hackathon tasks are hosted on Upwork. Raenest is Africa\'s largest Upwork partner and provides the smoothest way to withdraw your Upwork earnings to Nigerian bank accounts and across Africa. Both accounts are required to participate.',
  },
  {
    question: 'How does payment work?',
    answer:
      'You complete tasks on Upwork, get paid through Upwork, then withdraw seamlessly to your local bank account via Raenest. Raenest offers the best rates and fastest Upwork withdrawals in Africa.',
  },
  {
    question: 'Can I participate in multiple tracks?',
    answer:
      'Absolutely! You can take on tasks in Design, Writing, and Coding — or focus on just one track. The more tasks you complete, the more you earn and the higher you climb on the leaderboard.',
  },
  {
    question: 'Is using AI tools allowed?',
    answer:
      'Yes! AI is encouraged across all tracks. Use AI tools to assist with design, writing, or coding. The hackathon celebrates the combination of human creativity and AI capability.',
  },
  {
    question: 'What is the leaderboard?',
    answer:
      'The leaderboard ranks top performers across all tracks and is displayed publicly on both Raenest and DevCareer\'s websites. It showcases your Upwork profile, giving you visibility to potential clients and employers across Africa and beyond.',
  },
];

const MARQUEE_ITEMS = [
  'Upwork', '•', 'Raenest', '•', 'Africa', '•', 'Design', '•',
  'Writing', '•', 'Coding', '•', 'AI Powered', '•', 'Earn', '•',
];

/* ──────────── Main Component ──────────── */
const RaenestHackathon = () => {
  return (
    <Box className="rn-hackathon">
      <HeroSection />
      <MarqueeBanner />
      <PartnershipSection />
      <TracksSection />
      <PrerequisitesSection />
      <HowItWorksSection />
      <LeaderboardSection />
      <EarnSection />
      <FAQSection />
      <CTABanner />
    </Box>
  );
};

export default RaenestHackathon;

/* ──────────── Hero ──────────── */
const HeroSection = () => (
  <Box className="rn-hero" component="section">
    <Box className="rn-hero__content">
      <Typography className="rn-hero__title" component="h1">
        Earn on <span>Upwork</span>,{' '}
        Withdraw with <span>Raenest</span>
      </Typography>

      <Typography className="rn-hero__subtitle">
        Africa's biggest hackathon for Upwork freelancers. Design, write, or code. Complete
        real tasks, leverage AI, and get paid seamlessly through Raenest.
      </Typography>

      <Box className="rn-hero__logos">
        <UpworkLogo width={130} className="rn-hero__upwork-logo" variant="light" />
        <span className="rn-hero__logo-divider">×</span>
        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '0.5px' }}>
          Raenest
        </Typography>
      </Box>

      <Box className="rn-hero__cta-row">
        <Link to="/programs/raenest-hackathon/register" style={{ textDecoration: 'none' }}>
          <Button className="rn-btn-primary" disableElevation>
            Join the Hackathon
          </Button>
        </Link>
        <Button className="rn-btn-outline">Learn More ↓</Button>
      </Box>
    </Box>
  </Box>
);

/* ──────────── Marquee ──────────── */
const MarqueeBanner = () => (
  <Box className="rn-marquee-wrap">
    <Box className="rn-marquee">
      {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
        <span className="rn-marquee__item" key={i}>
          {item === '•' ? <span>{item}</span> : item}
        </span>
      ))}
    </Box>
  </Box>
);

/* ──────────── Partnership Section ──────────── */
const PartnershipSection = () => (
  <Box className="rn-section" component="section">
    <Box className="rn-section__container">
      <Box className="rn-partnership">
        <Box className="rn-partnership__content">
          <Typography className="rn-section__label">
            <span>🤝</span> The Partnership
          </Typography>
          <Typography
            className="rn-section__heading"
            component="h2"
            sx={{ color: 'var(--rn-text)' }}
          >
            Africa's Largest Upwork Partner
          </Typography>
          <Typography className="rn-section__description" sx={{ maxWidth: '600px !important' }}>
            Raenest is the largest Upwork partner in Africa, enabling freelancers across the
            continent to withdraw their Upwork earnings seamlessly. With instant transfers
            to Nigerian bank accounts, the best exchange rates, and zero hidden fees. Your
            money gets to you faster.
          </Typography>
          <Box className="rn-partnership__stats">
            <Box className="rn-partnership__stat">
              <Typography sx={{ fontSize: '2rem !important', fontWeight: 900, color: 'var(--rn-purple)' }}>
                #1
              </Typography>
              <Typography sx={{ fontSize: '0.85rem !important', color: 'var(--rn-text-secondary)' }}>
                Upwork Partner in Africa
              </Typography>
            </Box>
            <Box className="rn-partnership__stat">
              <Typography sx={{ fontSize: '2rem !important', fontWeight: 900, color: 'var(--rn-purple)' }}>
                1M+
              </Typography>
              <Typography sx={{ fontSize: '0.85rem !important', color: 'var(--rn-text-secondary)' }}>
                Users Trust Raenest
              </Typography>
            </Box>
            <Box className="rn-partnership__stat">
              <Typography sx={{ fontSize: '2rem !important', fontWeight: 900, color: 'var(--rn-purple)' }}>
                ⚡
              </Typography>
              <Typography sx={{ fontSize: '0.85rem !important', color: 'var(--rn-text-secondary)' }}>
                Instant Withdrawals
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className="rn-partnership__visual">
          <Box className="rn-partnership__card">
            <UpworkLogo width={100} className="rn-partnership__upwork-logo" />
            <Box className="rn-partnership__arrow">→</Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--rn-purple)' }}>
              Raenest
            </Typography>
            <Box className="rn-partnership__arrow">→</Box>
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: 'var(--rn-text)' }}>
              🏦 Your Bank
            </Typography>
          </Box>
          <Typography sx={{ textAlign: 'center', mt: 2, fontSize: '0.9rem !important', color: 'var(--rn-text-secondary)', fontStyle: 'italic' }}>
            Upwork → Raenest → Nigerian Bank Account
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

/* ──────────── Tracks ──────────── */
const TracksSection = () => (
  <Box className="rn-section rn-section--offwhite" component="section">
    <Box className="rn-section__container">
      <Typography className="rn-section__label">
        <span>🏆</span> Hackathon Tracks
      </Typography>
      <Typography
        className="rn-section__heading"
        component="h2"
        sx={{ color: 'var(--rn-text)' }}
      >
        Choose Your Track
      </Typography>
      <Typography className="rn-section__description">
        Three tracks, endless possibilities. Every task is a real Upwork project, pick the one
        that matches your passion and start earning.
      </Typography>

      <Box className="rn-tracks-grid">
        {TRACKS.map((track) => (
          <Box className="rn-track-card" key={track.title}>
            <Box className={`rn-track-card__icon ${track.iconClass}`}>
              {track.icon}
            </Box>
            <Typography className="rn-track-card__title">{track.title}</Typography>
            <Typography className="rn-track-card__desc">
              {track.description}
            </Typography>
            <span className="rn-track-card__tag">
              <span className="rn-ai-badge">✨ AI Assisted</span>
            </span>
            <Typography
              sx={{
                mt: '16px',
                fontSize: '0.85rem !important',
                color: 'var(--rn-text-secondary) !important',
                fontStyle: 'italic',
              }}
            >
              Tasks: {track.tasks}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

/* ──────────── Prerequisites ──────────── */
const PrerequisitesSection = () => (
  <Box className="rn-section rn-section--dark" component="section">
    <Box className="rn-section__container">
      <Typography className="rn-section__label rn-section__label--light">
        <span>📋</span> Prerequisites
      </Typography>
      <Typography
        className="rn-section__heading"
        component="h2"
        sx={{ color: 'var(--rn-white) !important' }}
      >
        Before You Start
      </Typography>
      <Typography
        className="rn-section__description"
        sx={{ color: 'rgba(255,255,255,0.6) !important', mb: '48px !important' }}
      >
        To participate in the Raenest Hackathon, you'll need to set up both accounts.
        This ensures you can receive tasks and get paid seamlessly.
      </Typography>

      <Box className="rn-prereq-grid">
        <Box className="rn-prereq-card">
          <Box className="rn-prereq-card__number">1</Box>
          <Box className="rn-prereq-card__logo-area">
            <UpworkLogo width={110} className="rn-prereq-upwork-logo" variant="light" />
          </Box>
          <Typography className="rn-prereq-card__title">Create an Upwork Account</Typography>
          <Typography className="rn-prereq-card__desc">
            Sign up as a freelancer on Upwork. Set up your profile with your skills in design,
            writing, or coding to start receiving hackathon tasks.
          </Typography>
          <Button
            className="rn-btn-prereq"
            component="a"
            href="https://www.upwork.com/signup"
            target="_blank"
            rel="noopener"
          >
            Sign Up on Upwork →
          </Button>
        </Box>

        <Box className="rn-prereq-connector">
          <Box className="rn-prereq-connector__line" />
          <Typography sx={{ color: 'var(--rn-lime)', fontWeight: 800, fontSize: '1.1rem' }}>
            CONNECT
          </Typography>
          <Box className="rn-prereq-connector__line" />
        </Box>

        <Box className="rn-prereq-card">
          <Box className="rn-prereq-card__number">2</Box>
          <Box className="rn-prereq-card__logo-area">
            <Typography sx={{ fontWeight: 800, fontSize: '1.6rem', color: 'var(--rn-purple)' }}>
              Raenest
            </Typography>
          </Box>
          <Typography className="rn-prereq-card__title">Connect to Raenest</Typography>
          <Typography className="rn-prereq-card__desc">
            Create a Raenest account and link your Upwork profile. This enables instant withdrawals
            of your Upwork earnings to your Nigerian bank account with the best rates.
          </Typography>
          <Button
            className="rn-btn-prereq"
            component="a"
            href="https://app.raenest.com/register"
            target="_blank"
            rel="noopener"
          >
            Sign Up on Raenest →
          </Button>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', mt: '48px' }}>
        <Box className="rn-prereq-note">
          <Typography sx={{ color: 'var(--rn-lime)', fontWeight: 700, fontSize: '0.9rem' }}>
            ⚠️ Both accounts must be created and connected before you can join the hackathon.
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

/* ──────────── How It Works ──────────── */
const HowItWorksSection = () => (
  <Box className="rn-section rn-section--offwhite" component="section">
    <Box className="rn-section__container">
      <Typography className="rn-section__label">
        <span>⚡</span> How It Works
      </Typography>
      <Typography
        className="rn-section__heading"
        component="h2"
        sx={{ color: 'var(--rn-text)' }}
      >
        Start Earning in 3 Easy Steps
      </Typography>
      <Typography className="rn-section__description">
        From sign-up to payout. it's simple, transparent, and designed to reward
        your skills through Upwork and Raenest.
      </Typography>

      <Box className="rn-steps-grid">
        {STEPS.map((step) => (
          <Box className="rn-step-card rn-step-card--light" key={step.number}>
            <Box className="rn-step-card__number">{step.number}</Box>
            <Typography className="rn-step-card__title" sx={{ color: 'var(--rn-text) !important' }}>
              {step.title}
            </Typography>
            <Typography className="rn-step-card__desc" sx={{ color: 'var(--rn-text-secondary) !important' }}>
              {step.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);

/* ──────────── Leaderboard Section ──────────── */
const LeaderboardSection = () => (
  <Box className="rn-section rn-section--dark" component="section">
    <Box className="rn-section__container">
      <Typography className="rn-section__label rn-section__label--light">
        <span>🏅</span> Leaderboard
      </Typography>
      <Typography
        className="rn-section__heading"
        component="h2"
        sx={{ color: 'var(--rn-white) !important' }}
      >
        Compete. Rise. Get Noticed.
      </Typography>
      <Typography
        className="rn-section__description"
        sx={{ color: 'rgba(255,255,255,0.6) !important' }}
      >
        A live leaderboard will showcase the top performers across all tracks displayed publicly
        on both Raenest and DevCareer's websites.
      </Typography>

      <Box className="rn-leaderboard">
        <Box className="rn-leaderboard__preview">
          {/* Mock leaderboard entries */}
          <Box className="rn-leaderboard__header">
            <Typography sx={{ flex: 0.5, fontWeight: 700, color: 'var(--rn-lime)', fontSize: '0.85rem' }}>
              RANK
            </Typography>
            <Typography sx={{ flex: 2, fontWeight: 700, color: 'var(--rn-lime)', fontSize: '0.85rem' }}>
              FREELANCER
            </Typography>
            <Typography sx={{ flex: 1, fontWeight: 700, color: 'var(--rn-lime)', fontSize: '0.85rem' }}>
              TRACK
            </Typography>
            <Typography sx={{ flex: 1, fontWeight: 700, color: 'var(--rn-lime)', fontSize: '0.85rem', textAlign: 'right' }}>
              TASKS
            </Typography>
          </Box>

          {[
            { rank: '🥇', name: 'Your Name Here', track: 'Design', tasks: '—' },
            { rank: '🥈', name: 'Could Be You', track: 'Coding', tasks: '—' },
            { rank: '🥉', name: 'Start Today', track: 'Writing', tasks: '—' },
          ].map((entry, i) => (
            <Box className="rn-leaderboard__row" key={i}>
              <Typography sx={{ flex: 0.5, fontSize: '1.2rem' }}>{entry.rank}</Typography>
              <Typography sx={{ flex: 2, color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
                {entry.name}
              </Typography>
              <Box sx={{ flex: 1 }}>
                <span className="rn-leaderboard__track-tag">{entry.track}</span>
              </Box>
              <Typography sx={{ flex: 1, color: 'rgba(255,255,255,0.5)', textAlign: 'right' }}>
                {entry.tasks}
              </Typography>
            </Box>
          ))}
        </Box>

        <Box className="rn-leaderboard__benefits">
          {[
            {
              icon: '👁️',
              title: 'Public Visibility',
              desc: 'Your Upwork profile is showcased to thousands of visitors on Raenest and DevCareer.',
            },
            {
              icon: '📊',
              title: 'Live Rankings',
              desc: 'Rankings update in real-time as you complete tasks. The more you do, the higher you climb.',
            },
            {
              icon: '🌐',
              title: 'Upwork Profile Spotlight',
              desc: 'Top performers get their Upwork profile featured, attracting clients from across the globe.',
            },
          ].map((benefit) => (
            <Box className="rn-leaderboard__benefit" key={benefit.title}>
              <span className="rn-leaderboard__benefit-icon">{benefit.icon}</span>
              <Box>
                <Typography sx={{ fontWeight: 700, color: 'var(--rn-white)', fontSize: '1rem', mb: '4px' }}>
                  {benefit.title}
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {benefit.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  </Box>
);

/* ──────────── Earn Section ──────────── */
const EarnSection = () => (
  <Box className="rn-section rn-section--purple" component="section">
    <Box className="rn-section__container">
      <Typography className="rn-section__label rn-section__label--light">
        <span>💰</span> Why Participate
      </Typography>
      <Typography
        className="rn-section__heading"
        component="h2"
        sx={{ color: 'var(--rn-white) !important' }}
      >
        Earn Money Doing What You Already Love
      </Typography>

      <Box className="rn-earn-grid">
        <Box className="rn-earn-features">
          {[
            {
              icon: '🎯',
              title: 'Real Upwork Tasks, Real Pay',
              desc: 'No toy projects. Complete genuine Upwork tasks and get paid for each one you finish. Your Upwork earnings history grows too.',
            },
            {
              icon: '🤖',
              title: 'AI-Powered Support',
              desc: 'Use AI tools across all tracks. Whether it\'s generating design variations, drafting content, or pair-programming, AI is your teammate.',
            },
            {
              icon: '🚀',
              title: 'Seamless Withdrawals via Raenest',
              desc: 'Raenest is Africa\'s largest Upwork partner. Withdraw your Upwork earnings instantly to your Nigerian bank account, best rates, zero stress.',
            },
            {
              icon: '🌍',
              title: 'Built for Africa',
              desc: 'This hackathon is designed for African Upwork freelancers. Participate from anywhere on the continent with just your skills and an internet connection.',
            },
          ].map((feature) => (
            <Box className="rn-earn-feature" key={feature.title}>
              <Box className="rn-earn-feature__icon">{feature.icon}</Box>
              <Box>
                <Typography className="rn-earn-feature__title">
                  {feature.title}
                </Typography>
                <Typography className="rn-earn-feature__desc">
                  {feature.desc}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>

        <Box className="rn-earn-visual">
          <UpworkLogo width={100} className="rn-earn-upwork-logo" variant="light" />
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', my: 1 }}>↓</Typography>
          <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--rn-lime)', mb: 1 }}>
            Raenest
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', my: 1 }}>↓</Typography>
          <Typography className="rn-earn-visual__amount">₦</Typography>
          <Typography className="rn-earn-visual__label">
            Straight to your Nigerian bank account
          </Typography>
          <Stack spacing={1.5} mt={3} alignItems="center">
            {['Design Tasks', 'Writing Tasks', 'Coding Tasks'].map((t) => (
              <Box
                key={t}
                sx={{
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 'var(--rn-radius-pill)',
                  px: '20px',
                  py: '10px',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  width: 'fit-content',
                }}
              >
                {t}
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  </Box>
);

/* ──────────── FAQ ──────────── */
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <Box className="rn-section" component="section">
      <Box className="rn-section__container" sx={{ textAlign: 'center' }}>
        <Typography className="rn-section__label">
          <span>❓</span> FAQ
        </Typography>
        <Typography
          className="rn-section__heading"
          component="h2"
          sx={{ color: 'var(--rn-text)' }}
        >
          Frequently Asked Questions
        </Typography>

        <Box className="rn-faq">
          {FAQS.map((faq, i) => (
            <Box
              className={`rn-faq-item ${openIndex === i ? 'rn-faq-item--open' : ''}`}
              key={i}
            >
              <button
                className="rn-faq-item__question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <h4>{faq.question}</h4>
                <span className="rn-faq-item__toggle">+</span>
              </button>
              <Box className="rn-faq-item__answer">
                <p>{faq.answer}</p>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

/* ──────────── CTA Banner ──────────── */
const CTABanner = () => (
  <Box className="rn-section" component="section" sx={{ pb: '120px !important' }}>
    <Box className="rn-section__container">
      <Box className="rn-cta-banner">
        <Typography className="rn-cta-banner__heading" component="h2">
          Ready to Earn on Upwork with Raenest?
        </Typography>
        <Typography className="rn-cta-banner__sub">
          Join Africa's biggest hackathon for Upwork freelancers. Set up your accounts,
          pick a track, and start earning.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" sx={{ position: 'relative', zIndex: 1 }}>
          <Link to="/programs/raenest-hackathon/register" style={{ textDecoration: 'none' }}>
            <Button className="rn-btn-primary" disableElevation>
              Get Started Now
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  </Box>
);
