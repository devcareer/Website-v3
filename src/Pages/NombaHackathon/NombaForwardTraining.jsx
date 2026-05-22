import React, { useRef } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { Logo as devCareerLogo } from '../../assets/Images';
import './NombaForwardTraining.css';
import nombaMark from '../../assets/Images/nomba-hackathon/nomba-mark.png';
import heroTeam from '../../assets/Images/nomba-hackathon/hero-team.jpg';
import codingTeam from '../../assets/Images/nomba-hackathon/coding-team.jpg';

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const CURRICULUM_MODULES = [
  {
    id: '01',
    title: 'Payment Infrastructure Fundamentals',
    topics: [
      'Nigerian payment landscape and rails architecture',
      'Cards, transfers, USSD, QR: where each flow fits',
      'Settlement paths, retries, and transaction states',
    ],
    outcome: 'Participants can model reliable end-to-end payment journeys for Nigerian businesses.',
  },
  {
    id: '02',
    title: 'Security, Fraud and Compliance Foundations',
    topics: [
      'Threat modeling for checkout and payout systems',
      'Authentication, authorization, and access controls',
      'PCI-aware implementation patterns and secure data handling',
    ],
    outcome: 'Teams ship with security-first engineering decisions and defensible architecture choices.',
  },
  {
    id: '03',
    title: 'Nomba API Integration & Webhooks',
    topics: [
      'Authentication lifecycle and token management',
      'Webhook signature validation and replay protection',
      'Idempotency, retries, and resilient API client design',
    ],
    outcome: 'Builders can integrate Nomba APIs safely and operate webhook workflows confidently.',
  },
  {
    id: '04',
    title: 'Checkout, Reconciliation and Monitoring',
    topics: [
      'Designing conversion-friendly checkout experiences',
      'Reconciliation data model for transactions and settlements',
      'Observability baselines: logs, metrics, and alerting',
    ],
    outcome: 'Participants can build payment products that are usable, auditable, and observable.',
  },
  {
    id: '05',
    title: 'Production Readiness Engineering',
    topics: [
      'Incident response playbooks for payment-critical systems',
      'Load and failure scenario testing for payment APIs',
      'Release strategy, rollback plans, and change safety',
    ],
    outcome: 'Teams leave with a practical release playbook and operational readiness discipline.',
  },
  {
    id: '06',
    title: 'Capstone Build + Certification Review',
    topics: [
      'Live integration challenge with Nomba-aligned problem set',
      'Security and architecture walkthrough with reviewers',
      'Technical defense and improvement recommendations',
    ],
    outcome: 'Qualified participants complete certification assessment with tangible build artifacts.',
  },
];

const CERT_PATH = [
  {
    step: 'Attend all core sessions',
    detail: 'Join live classes, complete required labs, and participate in mentor office hours.',
  },
  {
    step: 'Submit integration labs',
    detail: 'Deliver API integration checkpoints, webhook verification, and reconciliation outputs.',
  },
  {
    step: 'Pass security and architecture review',
    detail: 'Present implementation decisions and address risk, resilience, and data-protection controls.',
  },
  {
    step: 'Complete capstone demo',
    detail: 'Demo a working payment-enabled solution with production-ready engineering standards.',
  },
  {
    step: 'Earn Nomba certification',
    detail: 'Successful participants are issued certification records in payment security and integration.',
  },
];

const TRAINING_BENEFITS = [
  'Direct learning from engineers who ship payment systems in African markets.',
  'Hands-on API labs designed for real transaction reliability patterns.',
  'Reusable templates for webhook handling, idempotency, and security checks.',
  'Stronger confidence when building fintech products for Nigeria-first use cases.',
  'Certification proof useful for technical portfolios and career visibility.',
  'Better execution quality for hackathon submissions and post-hackathon launches.',
];

const NombaForwardTraining = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.set('.nft-reveal', { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.set('.nft-reveal', { autoAlpha: 0, y: 20 });

          ScrollTrigger.batch('.nft-reveal', {
            start: 'top 86%',
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.65,
                stagger: 0.07,
                ease: 'power2.out',
                overwrite: true,
              }),
          });

          const splitTitle = SplitText.create('.nft-hero__title', {
            type: 'words,chars',
            charsClass: 'nft-char',
          });
          const splitSubtitle = SplitText.create('.nft-hero__subtitle', {
            type: 'lines',
            linesClass: 'nft-line',
          });

          gsap
            .timeline({ defaults: { ease: 'power3.out' } })
            .from('.nft-hero__logo-row .nft-logo-chip, .nft-hero__logo-row .nft-logo-divider', {
              autoAlpha: 0,
              y: 16,
              duration: 0.5,
              stagger: 0.1,
            })
            .from(
              splitTitle.chars,
              {
                autoAlpha: 0,
                yPercent: 120,
                duration: 0.72,
                stagger: 0.014,
              },
              '-=0.25'
            )
            .from(
              splitSubtitle.lines,
              {
                autoAlpha: 0,
                y: 18,
                duration: 0.5,
                stagger: 0.06,
              },
              '-=0.28'
            )
            .from(
              '.nft-hero__cta .nft-btn, .nft-hero__meta .nft-meta-card',
              {
                autoAlpha: 0,
                y: 16,
                duration: 0.5,
                stagger: 0.1,
              },
              '-=0.2'
            );

          if (desktop) {
            const moduleCards = gsap.utils.toArray('.nft-module-card');
            gsap.set('.nft-module-card', { autoAlpha: 0.58, y: 16 });

            ScrollTrigger.create({
              trigger: '.nft-curriculum__grid',
              start: 'top top+=90',
              end: 'bottom bottom-=120',
              pin: '.nft-curriculum__intro',
              scrub: 0.6,
            });

            moduleCards.forEach((card) => {
              ScrollTrigger.create({
                trigger: card,
                start: 'top center',
                end: 'bottom center',
                onToggle: (self) => {
                  card.classList.toggle('is-active', self.isActive);
                  gsap.to(card, {
                    autoAlpha: self.isActive ? 1 : 0.58,
                    y: self.isActive ? 0 : 16,
                    duration: 0.35,
                    ease: 'power2.out',
                  });
                },
              });
            });

            gsap.fromTo(
              '.nft-progress__fill',
              { scaleY: 0, transformOrigin: 'top center' },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.nft-curriculum__grid',
                  start: 'top top+=120',
                  end: 'bottom bottom-=120',
                  scrub: true,
                },
              }
            );
          }

          gsap.to('.nft-parallax', {
            yPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: '.nft-parallax',
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });

          return () => {
            splitTitle.revert();
            splitSubtitle.revert();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <Box className="nft-page" ref={rootRef}>
      <Box className="nft-hero">
        <Box className="nft-hero__bg" style={{ backgroundImage: `url(${heroTeam})` }} />
        <Box className="nft-hero__overlay" />

        <Box className="nft-hero__content">
          <Stack className="nft-hero__logo-row" direction={{ xs: 'column', sm: 'row' }} alignItems="center">
            <Box className="nft-logo-chip">
              <img src={nombaMark} alt="Nomba logo" className="nft-logo-chip__mark" />
              <Typography className="nft-logo-chip__nomba">nomba</Typography>
            </Box>
            <Typography className="nft-logo-divider">|</Typography>
            <Box className="nft-logo-chip nft-logo-chip--devcareer">
              <img src={devCareerLogo} alt="DevCareer logo" className="nft-logo-chip__devcareer" />
            </Box>
          </Stack>

          <Typography className="nft-hero__title" component="h1">
            Nomba Forward Deployed Engineer Training
          </Typography>

          <Typography className="nft-hero__subtitle">
            A free Nigeria-focused engineering track for hackathon participants to master payment security,
            integration reliability, and production-ready delivery standards.
          </Typography>

          <Stack className="nft-hero__cta" direction={{ xs: 'column', sm: 'row' }}>
            <Link to="/programs/nomba-hackathon/register" style={{ textDecoration: 'none' }}>
              <Button className="nft-btn nft-btn--primary">Join Hackathon & Training</Button>
            </Link>
            <Link to="/programs/nomba-hackathon" style={{ textDecoration: 'none' }}>
              <Button className="nft-btn nft-btn--secondary">Back to Hackathon</Button>
            </Link>
          </Stack>

          <Stack className="nft-hero__meta" direction={{ xs: 'column', md: 'row' }}>
            <Box className="nft-meta-card">
              <Typography className="nft-meta-card__label">Duration</Typography>
              <Typography className="nft-meta-card__value">6 days intensive</Typography>
            </Box>
            <Box className="nft-meta-card">
              <Typography className="nft-meta-card__label">Format</Typography>
              <Typography className="nft-meta-card__value">Live sessions + labs</Typography>
            </Box>
            <Box className="nft-meta-card">
              <Typography className="nft-meta-card__label">Cost</Typography>
              <Typography className="nft-meta-card__value">Free for qualified teams</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box className="nft-section nft-section--light nft-reveal">
        <Box className="nft-container">
          <Typography className="nft-kicker">Training Overview</Typography>
          <Typography className="nft-heading" component="h2">
            What this program is designed to achieve
          </Typography>
          <Box className="nft-overview-grid">
            <Box className="nft-overview-card nft-reveal">
              <Typography className="nft-overview-card__title">Production Reliability</Typography>
              <Typography>
                Teach participants how to build payment products that handle retries, failures, and webhook
                events without data drift.
              </Typography>
            </Box>
            <Box className="nft-overview-card nft-reveal">
              <Typography className="nft-overview-card__title">Security Discipline</Typography>
              <Typography>
                Move beyond surface-level security by embedding threat modeling, auth controls, and secure
                transaction lifecycle handling.
              </Typography>
            </Box>
            <Box className="nft-overview-card nft-reveal">
              <Typography className="nft-overview-card__title">Integration Confidence</Typography>
              <Typography>
                Equip teams to integrate Nomba APIs quickly while preserving correctness, auditability, and
                maintainability.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="nft-section nft-section--offwhite nft-reveal">
        <Box className="nft-container nft-curriculum">
          <Typography className="nft-kicker">Curriculum</Typography>
          <Typography className="nft-heading" component="h2">
            Structured modules from fundamentals to capstone
          </Typography>

          <Box className="nft-curriculum__grid">
            <Box className="nft-curriculum__intro nft-reveal">
              <Typography className="nft-curriculum__window">6 Modules</Typography>
              <Typography className="nft-curriculum__headline">Build secure payment systems, not just demos.</Typography>
              <Typography className="nft-curriculum__copy">
                Each module includes live walkthroughs, applied lab work, and mentor checkpoints so teams can
                implement with confidence under hackathon timelines.
              </Typography>
              <Box className="nft-progress">
                <span className="nft-progress__fill" />
              </Box>
            </Box>

            <Box className="nft-module-list">
              {CURRICULUM_MODULES.map((module) => (
                <Box key={module.id} className="nft-module-card nft-reveal">
                  <Typography className="nft-module-card__id">{module.id}</Typography>
                  <Box className="nft-module-card__body">
                    <Typography className="nft-module-card__title">{module.title}</Typography>
                    <ul>
                      {module.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                    <Typography className="nft-module-card__outcome">Outcome: {module.outcome}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="nft-section nft-section--dark nft-reveal">
        <Box className="nft-container nft-path">
          <Box>
            <Typography className="nft-kicker nft-kicker--lime">Certification Path</Typography>
            <Typography className="nft-heading nft-heading--light" component="h2">
              How participants become Nomba certified
            </Typography>
            <Typography className="nft-copy nft-copy--light">
              Certification is based on attendance, practical lab performance, architecture quality,
              security-conscious implementation, and final capstone demonstration.
            </Typography>

            <Box className="nft-path-list">
              {CERT_PATH.map((item, index) => (
                <Box key={item.step} className="nft-path-item nft-reveal">
                  <span>{index + 1}</span>
                  <Box>
                    <Typography className="nft-path-item__title">{item.step}</Typography>
                    <Typography className="nft-path-item__detail">{item.detail}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="nft-path__image-wrap">
            <img src={codingTeam} alt="Team collaboration during training" className="nft-parallax" />
          </Box>
        </Box>
      </Box>

      <Box className="nft-section nft-section--light nft-reveal">
        <Box className="nft-container">
          <Typography className="nft-kicker">Advantages</Typography>
          <Typography className="nft-heading" component="h2">
            Why this training gives teams an edge
          </Typography>
          <Box className="nft-benefit-grid">
            {TRAINING_BENEFITS.map((benefit) => (
              <Box key={benefit} className="nft-benefit-card nft-reveal">
                <Typography>{benefit}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="nft-section nft-section--cta nft-reveal">
        <Box className="nft-container nft-cta">
          <Box>
            <Typography className="nft-heading" component="h2">
              Ready to qualify for Nomba certification?
            </Typography>
            <Typography className="nft-copy">
              Register for the hackathon to secure your training seat, complete the curriculum, and build a
              certification-worthy solution.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.2}>
            <Link to="/programs/nomba-hackathon/register" style={{ textDecoration: 'none' }}>
              <Button className="nft-btn nft-btn--primary">Register Now</Button>
            </Link>
            <Link to="/programs/nomba-hackathon" style={{ textDecoration: 'none' }}>
              <Button className="nft-btn nft-btn--secondary nft-btn--dark-text">View Hackathon Page</Button>
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default NombaForwardTraining;
