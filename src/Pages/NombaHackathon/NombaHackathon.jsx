import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import { Logo as devCareerLogo } from '../../assets/Images';
import './NombaHackathon.css';
import nombaMark from '../../assets/Images/nomba-hackathon/nomba-mark.png';
import nombaSocial from '../../assets/Images/nomba-hackathon/nomba-social.jpg';
import heroTeam from '../../assets/Images/nomba-hackathon/hero-team.jpg';
import codingTeam from '../../assets/Images/nomba-hackathon/coding-team.jpg';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, SplitText);

const FOCUS_TRACKS = [
  {
    title: 'Secure Checkout & Fraud Defense',
    description:
      'Build secure checkout patterns for cards, transfers, USSD, and QR with stronger fraud detection, transaction verification, and webhook reliability.',
    bullets: ['PCI-aware flow design', 'Tokenization-ready UX', 'Risk and verification dashboards'],
  },
  {
    title: 'Merchant Integration Accelerator',
    description:
      'Create tools that help businesses integrate faster with Nomba APIs including onboarding, payment-link setup, and reconciliation workflows.',
    bullets: ['Onboarding automation', 'Merchant setup assistants', 'Settlement and reconciliation views'],
  },
  {
    title: 'Cross-Border & Multi-Currency Flows',
    description:
      'Design solutions for USD and NGN payment experiences with settlement visibility, currency routing insights, and conversion confidence.',
    bullets: ['NGN/USD acceptance flows', 'Settlement wallet clarity', 'Cross-border payment UX'],
  },
];

const TIMELINE_PHASES = [
  {
    phase: 'Registration',
    dates: '1 - 15 June 2026',
    activities: 'Open registration and outreach across DevCareer and external channels.',
    milestones: ['Applications open', 'Community outreach', 'Team matching support'],
  },
  {
    phase: 'Onboarding & Training',
    dates: '16 - 21 June 2026',
    activities:
      'Orientation, sandbox credentials, live API training, office hours, and challenge briefs.',
    milestones: ['Kickoff orientation', 'Training labs', 'API key provisioning'],
  },
  {
    phase: 'Building',
    dates: '23 - 29 June 2026',
    activities:
      'One-week build sprint with Nomba engineer support; submissions close 11:59 PM WAT, 29 June 2026.',
    milestones: ['Daily office hours', 'Mentor clinics', 'Submission freeze'],
  },
  {
    phase: 'Judging',
    dates: '30 June - 6 July 2026',
    activities: 'Submission evaluation by Nomba team and external judges.',
    milestones: ['Technical review', 'Security checks', 'Final scorecards'],
  },
  {
    phase: 'Demo Day & Awards',
    dates: '11 July 2026',
    activities:
      'Virtual Demo Day, live-streamed prize ceremony, and affiliate onboarding session.',
    milestones: ['Finalist demos', 'Live awards', 'Post-program onboarding'],
  },
];

const PRIZE_BREAKDOWN = [
  {
    rank: '1st',
    title: 'Grand Prize',
    amount: 4000,
    label: '$4,000',
    bonus: 'Feature spotlight and priority showcase',
  },
  {
    rank: '2nd',
    title: 'Runner-up',
    amount: 1500,
    label: '$1,500',
    bonus: 'Mentor advisory and partner visibility',
  },
  {
    rank: '3rd',
    title: 'Top Builder',
    amount: 1000,
    label: '$1,000',
    bonus: 'Community launch support',
  },
];

const PRIZE_PODIUM_ORDER = ['2nd', '1st', '3rd'];
const PODIUM_PRIZES = PRIZE_PODIUM_ORDER.map((rank) => PRIZE_BREAKDOWN.find((prize) => prize.rank === rank)).filter(
  Boolean
);

const JUDGING_CRITERIA = [
  { name: 'Problem Relevance', weight: 20, color: '#ff5f6d', colorSoft: '#ffc371' },
  { name: 'Technical Execution', weight: 25, color: '#3a86ff', colorSoft: '#62d2ff' },
  { name: 'Security & Reliability', weight: 20, color: '#06d6a0', colorSoft: '#90f7ec' },
  { name: 'Product UX & Clarity', weight: 15, color: '#ff7f50', colorSoft: '#ffd166' },
  { name: 'Nomba Integration Depth', weight: 20, color: '#9b5de5', colorSoft: '#f15bb5' },
];

const SUBMISSION_REQUIREMENTS = [
  'Public GitHub repository with clear commit history within hackathon dates.',
  'Working MVP URL (hosted and accessible to judges).',
  'Short demo video (2-3 minutes) showing use case and flow.',
  'Architecture and security note covering auth, webhooks, and data handling.',
  'Optional test credentials for protected routes and environments.',
];

const FAQS = [
  {
    question: 'Who can participate?',
    answer:
      'Developers, designers, and product builders from eligible communities. Solo and team participation are allowed, but teams are recommended for stronger delivery.',
  },
  {
    question: 'Is the training really free?',
    answer:
      'Yes. Qualified participants can join free Nomba Forward deployed engineer training during onboarding and can pursue certification in payment security and integration.',
  },
  {
    question: 'Do we need to use Nomba APIs?',
    answer:
      'Yes. Solutions are expected to demonstrate meaningful integration with Nomba payment capabilities and platform workflows.',
  },
  {
    question: 'Can we use AI tools and frameworks?',
    answer:
      'Yes. You may use frameworks and AI tools, but final submissions must be original work created within the hackathon timeline.',
  },
  {
    question: 'What happens after submission?',
    answer:
      'Projects go through validation, then judging. Finalists are invited to Demo Day on July 11, 2026 for live presentations and awards.',
  },
];

const NombaHackathon = () => {
  const rootRef = useRef(null);
  const criteriaSectionRef = useRef(null);
  const criteriaCanvasRef = useRef(null);
  const [openFaq, setOpenFaq] = useState(null);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    gsap.to(window, {
      duration: 0.85,
      ease: 'power2.out',
      scrollTo: { y: target, offsetY: 90 },
    });
  };

  useEffect(() => {
    const host = criteriaSectionRef.current;
    const canvas = criteriaCanvasRef.current;

    if (!host || !canvas) {
      return undefined;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowPowerDevice = window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches;
    if (reducedMotion || lowPowerDevice) {
      host.classList.add('nm-criteria-static');
      return () => host.classList.remove('nm-criteria-static');
    }

    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.2 : 1.5));

    const blobConfigs = [
      { color: 0xff5f6d, size: 1.35, x: -2.2, y: 1.15, z: -1.1, speed: 0.42 },
      { color: 0x3a86ff, size: 1.2, x: 2.05, y: 0.35, z: -0.6, speed: 0.38 },
      { color: 0x06d6a0, size: 1.12, x: -0.2, y: -1.1, z: -0.8, speed: 0.5 },
      { color: 0xf15bb5, size: 0.95, x: 1.35, y: -0.75, z: -1.35, speed: 0.62 },
    ];

    const blobGroup = new THREE.Group();
    scene.add(blobGroup);

    const blobs = blobConfigs.map((config) => {
      const geometry = new THREE.SphereGeometry(config.size, 34, 34);
      const material = new THREE.MeshBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: mobile ? 0.2 : 0.24,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(config.x, config.y, config.z);
      mesh.userData = {
        baseX: config.x,
        baseY: config.y,
        baseZ: config.z,
        speed: config.speed,
      };
      blobGroup.add(mesh);
      return mesh;
    });

    const particleCount = mobile ? 130 : 240;
    const particlePalette = [0xffd166, 0x62d2ff, 0x90f7ec, 0xf15bb5, 0xffffff];
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 3.6;
      const drift = (Math.random() - 0.5) * 0.8;

      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = Math.sin(angle) * radius * 0.42 + drift;
      positions[i3 + 2] = (Math.random() - 0.5) * 3.6;

      const color = new THREE.Color(particlePalette[i % particlePalette.length]);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        size: mobile ? 0.055 : 0.075,
        transparent: true,
        opacity: mobile ? 0.42 : 0.58,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(particles);

    const resize = () => {
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(host);

    let scrollProgress = 0;
    const scrollSignal = { progress: 0 };
    const sectionScrollTrigger = ScrollTrigger.create({
      trigger: host,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    const signalTween = gsap.to(scrollSignal, {
      progress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: host,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
      },
      onUpdate: () => {
        host.style.setProperty('--nm-criteria-progress', scrollSignal.progress.toFixed(3));
      },
    });

    let frame = 0;
    renderer.setAnimationLoop(() => {
      frame += 0.008;

      blobGroup.rotation.z = Math.sin(frame * 0.48) * 0.09;
      blobGroup.rotation.y = Math.cos(frame * 0.42) * 0.1;

      blobs.forEach((blob, index) => {
        const pulse = frame * blob.userData.speed + index;
        blob.position.x = blob.userData.baseX + Math.cos(pulse) * (0.22 + scrollProgress * 0.5);
        blob.position.y = blob.userData.baseY + Math.sin(pulse * 1.18) * (0.18 + scrollProgress * 0.38);
        blob.scale.setScalar(1 + Math.sin(pulse * 1.4) * (0.08 + scrollProgress * 0.08));
      });

      const particlePositions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i += 1) {
        const i3 = i * 3;
        particlePositions[i3 + 1] += Math.sin(frame + i * 0.17) * 0.0022;
        particlePositions[i3] += Math.cos(frame * 0.9 + i * 0.11) * 0.0014;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      particles.rotation.z += 0.0008 + scrollProgress * 0.0024;
      particles.rotation.y += 0.00045 + scrollProgress * 0.0018;

      renderer.render(scene, camera);
    });

    return () => {
      signalTween.kill();
      sectionScrollTrigger.kill();
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      particleGeometry.dispose();
      particles.material.dispose();
      blobs.forEach((blob) => {
        blob.geometry.dispose();
        blob.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: '(min-width: 1024px)',
          mobile: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { desktop, mobile, reduceMotion } = context.conditions;

          if (reduceMotion) {
            gsap.set('.nm-reveal', { autoAlpha: 1, y: 0 });
            return;
          }

          gsap.set('.nm-reveal', { autoAlpha: 0, y: mobile ? 14 : 24 });

          ScrollTrigger.batch('.nm-reveal', {
            start: mobile ? 'top 92%' : 'top 85%',
            once: mobile,
            onEnter: (batch) =>
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: mobile ? 0.5 : 0.7,
                stagger: mobile ? 0.06 : 0.08,
                ease: 'power2.out',
                overwrite: true,
              }),
            ...(mobile
              ? {}
              : {
                  onLeaveBack: (batch) =>
                    gsap.to(batch, {
                      autoAlpha: 0,
                      y: 24,
                      duration: 0.35,
                      ease: 'power2.out',
                      overwrite: true,
                    }),
                }),
          });

          let splitTitle;
          let splitSubtitle;
          const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

          if (desktop) {
            splitTitle = SplitText.create('.nm-hero__title', {
              type: 'words,chars',
              charsClass: 'nm-char',
            });
            splitSubtitle = SplitText.create('.nm-hero__subtitle', {
              type: 'lines',
              linesClass: 'nm-line',
            });

            heroTimeline
              .from('.nm-hero__glow', {
                scale: 0.75,
                autoAlpha: 0,
                duration: 0.9,
              })
              .from(
                '.nm-hero__logos .nm-brand-chip, .nm-hero__logos .nm-brand-divider',
                {
                  y: 16,
                  autoAlpha: 0,
                  duration: 0.5,
                  stagger: 0.1,
                },
                '-=0.45'
              )
              .from(
                splitTitle.chars,
                {
                  yPercent: 125,
                  autoAlpha: 0,
                  duration: 0.8,
                  stagger: 0.015,
                },
                '-=0.4'
              )
              .from(
                splitSubtitle.lines,
                {
                  y: 22,
                  autoAlpha: 0,
                  duration: 0.55,
                  stagger: 0.07,
                },
                '-=0.35'
              )
              .from(
                '.nm-hero__cta-row .nm-btn-primary, .nm-hero__cta-row .nm-btn-secondary',
                {
                  y: 16,
                  autoAlpha: 0,
                  duration: 0.55,
                  stagger: 0.12,
                },
                '-=0.2'
              )
              .from(
                '.nm-stat',
                {
                  y: 16,
                  autoAlpha: 0,
                  duration: 0.45,
                  stagger: 0.1,
                },
                '-=0.25'
              );
          } else {
            heroTimeline
              .from('.nm-hero__logos .nm-brand-chip, .nm-hero__logos .nm-brand-divider', {
                y: 12,
                autoAlpha: 0,
                duration: 0.42,
                stagger: 0.08,
              })
              .from(
                '.nm-hero__title, .nm-hero__subtitle',
                {
                  y: 18,
                  autoAlpha: 0,
                  duration: 0.5,
                  stagger: 0.1,
                },
                '-=0.2'
              )
              .from(
                '.nm-hero__cta-row .nm-btn-primary, .nm-hero__cta-row .nm-btn-secondary, .nm-stat',
                {
                  y: 12,
                  autoAlpha: 0,
                  duration: 0.42,
                  stagger: 0.06,
                },
                '-=0.24'
              );
          }

          const statNodes = gsap.utils.toArray('.nm-countup');
          statNodes.forEach((node) => {
            const targetValue = Number(node.getAttribute('data-value'));
            if (Number.isNaN(targetValue)) {
              return;
            }

            const prefix = node.getAttribute('data-prefix') || '';
            const suffix = node.getAttribute('data-suffix') || '';
            const decimals = Number(node.getAttribute('data-decimals') || 0);
            const valueProxy = { value: 0 };

            ScrollTrigger.create({
              trigger: node,
              start: 'top 88%',
              once: true,
              onEnter: () => {
                gsap.to(valueProxy, {
                  value: targetValue,
                  duration: 1.15,
                  ease: 'power1.out',
                  onUpdate: () => {
                    const currentValue =
                      decimals > 0
                        ? Number(valueProxy.value.toFixed(decimals)).toLocaleString(undefined, {
                            minimumFractionDigits: decimals,
                            maximumFractionDigits: decimals,
                          })
                        : Math.round(valueProxy.value).toLocaleString();
                    node.textContent = `${prefix}${currentValue}${suffix}`;
                  },
                });
              },
            });
          });

          if (desktop) {
            const timelineCards = gsap.utils.toArray('.nm-phase-card');
            gsap.set('.nm-phase-card', { autoAlpha: 0.55, y: 22 });

            timelineCards.forEach((card) => {
              ScrollTrigger.create({
                trigger: card,
                start: 'top center',
                end: 'bottom center',
                onToggle: (self) => {
                  card.classList.toggle('is-active', self.isActive);
                  gsap.to(card, {
                    autoAlpha: self.isActive ? 1 : 0.55,
                    y: self.isActive ? 0 : 22,
                    duration: 0.35,
                    ease: 'power2.out',
                  });
                },
              });
            });

            gsap.fromTo(
              '.nm-timeline-rail__fill',
              { scaleY: 0, transformOrigin: 'top center' },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: '.nm-timeline-grid',
                  start: 'top top+=120',
                  end: 'bottom bottom-=120',
                  scrub: true,
                },
              }
            );
          }

          const prizeTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.nm-prizes',
              start: 'top 76%',
              once: true,
            },
          });

          prizeTimeline
            .from('.nm-prize-stage', {
              autoAlpha: 0,
              y: 28,
              scale: 0.98,
              duration: 0.55,
              ease: 'power2.out',
            })
            .from(
              '.nm-prize-stage__spotlight',
              {
                autoAlpha: 0,
                scaleY: 0.25,
                transformOrigin: 'top center',
                duration: 0.46,
                ease: 'power2.out',
              },
              '-=0.35'
            )
            .from(
              '.nm-prize-slot--2nd, .nm-prize-slot--3rd',
              {
                autoAlpha: 0,
                x: (index) => (index === 0 ? -44 : 44),
                y: 26,
                rotateY: (index) => (index === 0 ? 12 : -12),
                duration: 0.56,
                stagger: 0.08,
                ease: 'power2.out',
              },
              '-=0.08'
            )
            .from(
              '.nm-prize-slot--1st',
              {
                autoAlpha: 0,
                y: 58,
                scale: 0.88,
                rotateX: -22,
                duration: 0.74,
                ease: 'back.out(1.12)',
              },
              '-=0.34'
            )
            .from(
              '.nm-prize-slot__trophy',
              {
                autoAlpha: 0,
                y: -24,
                scale: 0.55,
                duration: 0.4,
                stagger: { amount: 0.2, from: 'center' },
                ease: 'back.out(1.7)',
              },
              '-=0.5'
            )
            .from(
              '.nm-prize-slot__winner-badge',
              {
                autoAlpha: 0,
                y: -10,
                scale: 0.88,
                duration: 0.36,
                ease: 'power2.out',
              },
              '-=0.26'
            )
            .from(
              '.nm-prize-perks li',
              {
                autoAlpha: 0,
                x: -14,
                duration: 0.4,
                stagger: 0.07,
              },
              '-=0.16'
            );

          gsap.to('.nm-prize-stage__sheen', {
            xPercent: 165,
            autoAlpha: 0,
            duration: 1.2,
            ease: 'power2.out',
            delay: 0.2,
          });

          if (desktop) {
            gsap.to('.nm-prize-slot--1st .nm-prize-slot__trophy', {
              y: -8,
              duration: 1.6,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            });

            gsap.to('.nm-prize-slot--1st .nm-prize-slot__ring', {
              scale: 1.08,
              duration: 1.4,
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
            });
          }

          gsap.set('.nm-criteria-item', {
            autoAlpha: 0,
            y: 34,
            rotateX: 8,
            transformOrigin: 'top center',
            transformPerspective: 900,
          });
          gsap.set('.nm-criteria-bar__fill', {
            scaleX: 0,
            transformOrigin: 'left center',
          });
          gsap.set('.nm-criteria-shimmer', {
            autoAlpha: 0,
            xPercent: -130,
          });
          gsap.set('.nm-criteria-score-chip', {
            autoAlpha: 0,
            scale: 0.72,
            transformOrigin: 'center center',
          });

          const criteriaTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: '.nm-criteria-showcase',
              start: 'top 78%',
              once: true,
            },
          });

          criteriaTimeline
            .to('.nm-criteria-item', {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 0.64,
              stagger: 0.11,
              ease: 'back.out(1.15)',
            })
            .to(
              '.nm-criteria-score-chip',
              {
                autoAlpha: 1,
                scale: 1,
                duration: 0.42,
                stagger: 0.1,
                ease: 'power2.out',
              },
              '-=0.45'
            )
            .to(
              '.nm-criteria-bar__fill',
              {
                scaleX: 1,
                duration: 0.78,
                stagger: 0.1,
                ease: 'power3.out',
              },
              '-=0.42'
            )
            .to(
              '.nm-criteria-shimmer',
              {
                autoAlpha: 1,
                xPercent: 140,
                duration: 1.05,
                stagger: 0.08,
                ease: 'power2.out',
              },
              '-=0.72'
            );

          const scoreNodes = gsap.utils.toArray('.nm-criteria-score');
          scoreNodes.forEach((node) => {
            const target = Number(node.getAttribute('data-weight'));
            if (Number.isNaN(target)) {
              return;
            }

            const scoreProxy = { value: 0 };
            ScrollTrigger.create({
              trigger: node,
              start: 'top 90%',
              once: true,
              onEnter: () => {
                gsap.to(scoreProxy, {
                  value: target,
                  duration: 1.04,
                  ease: 'power2.out',
                  onUpdate: () => {
                    node.textContent = String(Math.round(scoreProxy.value));
                  },
                });
              },
            });
          });

          if (desktop) {
            gsap.to('.nm-parallax-image', {
              yPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: '.nm-parallax-image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });
          }

          return () => {
            splitTitle?.revert();
            splitSubtitle?.revert();
          };
        }
      );

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  return (
    <Box className="nm-page" ref={rootRef}>
      <Box className="nm-hero" component="section">
        <Box className="nm-hero__bg" style={{ backgroundImage: `url(${heroTeam})` }} />
        <Box className="nm-hero__overlay" />
        <Box className="nm-hero__glow" />

        <Box className="nm-hero__content">
          <Stack className="nm-hero__logos" direction={{ xs: 'column', sm: 'row' }} alignItems="center">
            <Box className="nm-brand-chip">
              <img src={nombaMark} alt="Nomba logo" className="nm-brand-chip__mark" />
              <Typography className="nm-brand-chip__text nm-brand-chip__text--nomba">nomba</Typography>
            </Box>
            <Typography className="nm-brand-divider">|</Typography>
            <Box className="nm-brand-chip nm-brand-chip--devcareer">
              <img src={devCareerLogo} alt="DevCareer logo" className="nm-brand-chip__devcareer" />
            </Box>
          </Stack>

          <Typography component="h1" className="nm-hero__title">
            Build Payment Infrastructure Products for Nigeria&apos;s Next Growth Wave
          </Typography>

          <Typography className="nm-hero__subtitle">
            Join the Nomba x DevCareer hackathon to build high-impact payment solutions, attend free
            Nomba Forward deployed engineer training, and earn certification in payment security and integration.
          </Typography>

          <Stack className="nm-hero__cta-row" direction={{ xs: 'column', sm: 'row' }}>
            <Link to="/programs/nomba-hackathon/register" style={{ textDecoration: 'none' }}>
              <Button className="nm-btn-primary" disableElevation>
                Register Now
              </Button>
            </Link>
            <Button className="nm-btn-secondary" onClick={() => scrollToSection('timeline')}>
              View Timeline
            </Button>
          </Stack>

          <Stack className="nm-stat-row" direction={{ xs: 'column', md: 'row' }}>
            <Box className="nm-stat">
              <Typography className="nm-stat__number nm-countup" data-value="600" data-suffix="K+">
                600K+
              </Typography>
              <Typography className="nm-stat__label">Active Businesses Signal</Typography>
            </Box>
            <Box className="nm-stat">
              <Typography
                className="nm-stat__number nm-countup"
                data-value="99.9"
                data-suffix="%"
                data-decimals="1"
              >
                99.9%
              </Typography>
              <Typography className="nm-stat__label">Platform Uptime Positioning</Typography>
            </Box>
            <Box className="nm-stat">
              <Typography className="nm-stat__number nm-countup" data-prefix="$" data-value="6500">
                $6,500
              </Typography>
              <Typography className="nm-stat__label">Prize & Incentive Pool</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Box className="nm-section nm-section--light nm-reveal">
        <Box className="nm-container nm-brand">
          <Box className="nm-brand__left">
            <Typography className="nm-kicker">Powered By Nomba</Typography>
            <Typography className="nm-heading" component="h2">
              Trusted rails for modern African payments
            </Typography>
            <Typography className="nm-copy">
              Nomba supports cards, transfers, USSD, and QR with instant settlement patterns and
              developer-ready APIs. This hackathon is designed to build practical, secure products with that
              infrastructure.
            </Typography>
            <Stack className="nm-chip-row" direction="row" flexWrap="wrap" gap={1.2}>
              <span className="nm-chip">Instant settlement patterns</span>
              <span className="nm-chip">Cards + Transfers + USSD + QR</span>
              <span className="nm-chip">OAuth 2.0 API access</span>
              <span className="nm-chip">Security-led architecture</span>
            </Stack>
          </Box>
          <Box className="nm-brand__right">
            <img src={nombaSocial} alt="Nomba brand preview" className="nm-brand__image" />
          </Box>
        </Box>
      </Box>

      <Box className="nm-section nm-section--offwhite nm-reveal">
        <Box className="nm-container">
          <Typography className="nm-kicker">Hackathon Focus Areas</Typography>
          <Typography className="nm-heading" component="h2">
            Three product directions for this edition
          </Typography>
          <Typography className="nm-copy nm-copy--wide">
            Teams can build across multiple domains, but each submission should have one primary focus area.
          </Typography>

          <Box className="nm-track-grid">
            {FOCUS_TRACKS.map((track) => (
              <Box key={track.title} className="nm-track-card nm-reveal">
                <Typography className="nm-track-card__title">{track.title}</Typography>
                <Typography className="nm-track-card__desc">{track.description}</Typography>
                <ul className="nm-track-card__list">
                  {track.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="nm-section nm-section--dark nm-reveal">
        <Box className="nm-container nm-training">
          <Box>
            <Typography className="nm-kicker nm-kicker--lime">Free Training + Certification</Typography>
            <Typography className="nm-heading nm-heading--light" component="h2">
              Nomba Forward Deployed Engineer Training
            </Typography>
            <Typography className="nm-copy nm-copy--light">
              During onboarding week, qualified participants join free learning sessions focused on secure
              implementation patterns, production integration standards, and real-world payment operations.
            </Typography>
            <Stack className="nm-cert-list">
              <Box className="nm-cert-item nm-reveal">
                <strong>Certification Track 1:</strong> Payment Security Foundations
              </Box>
              <Box className="nm-cert-item nm-reveal">
                <strong>Certification Track 2:</strong> API Integration and Webhooks
              </Box>
              <Box className="nm-cert-item nm-reveal">
                <strong>Certification Track 3:</strong> Production-grade Checkout Delivery
              </Box>
            </Stack>
            <Link to="/programs/nomba-forward-training" style={{ textDecoration: 'none' }}>
              <Button className="nm-btn-training">View Full Training Curriculum</Button>
            </Link>
          </Box>
          <Box className="nm-training__image-wrap">
            <img src={codingTeam} alt="Hackathon builders collaborating" className="nm-parallax-image" />
          </Box>
        </Box>
      </Box>

      <Box id="timeline" className="nm-section nm-section--light nm-reveal">
        <Box className="nm-container nm-timeline-wrap">
          <Typography className="nm-kicker">Programme Timeline</Typography>
          <Typography className="nm-heading" component="h2">
            Structured delivery from registration to Demo Day
          </Typography>
          <Typography className="nm-copy nm-copy--wide">
            This timeline is intentionally paced to move teams from idea validation to secure implementation and
            final pitch readiness.
          </Typography>

          <Box className="nm-timeline-grid">
            <Box className="nm-timeline-intro nm-reveal">
              <Typography className="nm-timeline-intro__window">June 1 - July 11, 2026</Typography>
              <Typography className="nm-timeline-intro__headline">5 major phases. One decisive sprint.</Typography>
              <Typography className="nm-timeline-intro__copy">
                From onboarding to live awards, each phase has a clear objective to help teams ship with quality,
                confidence, and deep Nomba integration.
              </Typography>
              <Box className="nm-timeline-rail">
                <span className="nm-timeline-rail__fill" />
              </Box>
            </Box>

            <Box className="nm-timeline-cards">
              {TIMELINE_PHASES.map((phase, index) => (
                <Box key={phase.phase} className="nm-phase-card nm-reveal">
                  <Typography className="nm-phase-card__index">{String(index + 1).padStart(2, '0')}</Typography>
                  <Box className="nm-phase-card__body">
                    <Typography className="nm-phase-card__phase">{phase.phase}</Typography>
                    <Typography className="nm-phase-card__date">{phase.dates}</Typography>
                    <Typography className="nm-phase-card__activity">{phase.activities}</Typography>
                    <Box className="nm-phase-card__milestones">
                      {phase.milestones.map((milestone) => (
                        <span key={milestone}>{milestone}</span>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="nm-section nm-section--offwhite nm-reveal">
        <Box className="nm-container nm-prizes">
          <Typography className="nm-kicker">Prize</Typography>
          <Typography className="nm-heading" component="h2">
            Winner podium for the strongest teams
          </Typography>
          <Typography className="nm-copy nm-copy--wide">
            Grand Prize takes center stage, with runner-up awards positioned beside it in a live winner-selection
            reveal format.
          </Typography>

          <Box className="nm-prize-stage nm-reveal">
            <span className="nm-prize-stage__spotlight" />
            <span className="nm-prize-stage__sheen" />

            <Box className="nm-prize-podium">
              {PODIUM_PRIZES.map((prize) => (
                <Box key={prize.rank} className={`nm-prize-slot nm-prize-slot--${prize.rank.toLowerCase()}`}>
                  <span className="nm-prize-slot__ring" />
                  <span className="nm-prize-slot__trophy" aria-hidden="true">
                    {prize.rank === '1st' ? '🏆' : '🏅'}
                  </span>
                  {prize.rank === '1st' && (
                    <Typography className="nm-prize-slot__winner-badge">Grand Prize Winner</Typography>
                  )}
                  <Typography className="nm-prize-slot__rank">{prize.rank} Place</Typography>
                  <Typography className="nm-prize-slot__title">{prize.title}</Typography>
                  <Typography className="nm-prize-slot__amount">
                    <span className="nm-countup" data-prefix="$" data-value={prize.amount}>
                      {prize.label}
                    </span>
                  </Typography>
                  <Typography className="nm-prize-slot__bonus">{prize.bonus}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="nm-prize-perks nm-reveal">
            <Typography className="nm-prize-perks__title">Beyond cash awards</Typography>
            <ul>
              <li>Winner demo amplification across DevCareer and partner channels.</li>
              <li>Fast-track access to Nomba engineering feedback sessions.</li>
              <li>Post-hackathon product showcase opportunities for top teams.</li>
              <li>Official participation and certification records for qualified trainees.</li>
            </ul>
          </Box>
        </Box>
      </Box>

      <Box className="nm-section nm-section--light nm-reveal">
        <Box className="nm-container">
          <Typography className="nm-kicker">Judging Criteria</Typography>
          <Typography className="nm-heading" component="h2">
            Transparent evaluation framework
          </Typography>

          <Box className="nm-criteria-showcase" ref={criteriaSectionRef}>
            <canvas ref={criteriaCanvasRef} className="nm-criteria-canvas" aria-hidden="true" />
            <Box className="nm-criteria-veil" />

            <Box className="nm-criteria-grid">
              {JUDGING_CRITERIA.map((criterion) => (
                <Box
                  key={criterion.name}
                  className="nm-criteria-item"
                  style={{
                    '--nm-criterion-color': criterion.color,
                    '--nm-criterion-color-soft': criterion.colorSoft,
                  }}
                >
                  <Stack direction="row" justifyContent="space-between" alignItems="center" gap={1.2}>
                    <Typography className="nm-criteria-item__name">{criterion.name}</Typography>
                    <Stack direction="row" alignItems="center" gap={0.6} className="nm-criteria-score-chip">
                      <Typography className="nm-criteria-score" data-weight={criterion.weight}>
                        0
                      </Typography>
                      <Typography className="nm-criteria-score__suffix">%</Typography>
                    </Stack>
                  </Stack>
                  <Box className="nm-criteria-bar">
                    <span className="nm-criteria-bar__fill" style={{ width: `${criterion.weight}%` }} />
                    <span className="nm-criteria-shimmer" />
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="nm-submissions">
            <Typography className="nm-submissions__title">Submission Requirements</Typography>
            <ul>
              {SUBMISSION_REQUIREMENTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Box>
        </Box>
      </Box>

      <Box className="nm-section nm-section--dark nm-reveal">
        <Box className="nm-container nm-faq-wrap">
          <Typography className="nm-kicker nm-kicker--lime">FAQ</Typography>
          <Typography className="nm-heading nm-heading--light" component="h2">
            Frequently Asked Questions
          </Typography>

          <Box className="nm-faq-list">
            {FAQS.map((faq, index) => (
              <Box key={faq.question} className={`nm-faq-item ${openFaq === index ? 'is-open' : ''}`}>
                <button
                  type="button"
                  className="nm-faq-item__question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <span>+</span>
                </button>
                <Box className="nm-faq-item__answer">
                  <Typography>{faq.answer}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="nm-section nm-section--cta nm-reveal">
        <Box className="nm-container nm-cta">
          <Box className="nm-cta__copy">
            <Typography className="nm-heading" component="h2">
              Ready to build with Nomba?
            </Typography>
            <Typography className="nm-copy nm-copy--wide">
              Register now, secure your onboarding slot, and start building toward Demo Day on July 11, 2026.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5}>
            <Link to="/programs/nomba-hackathon/register" style={{ textDecoration: 'none' }}>
              <Button className="nm-btn-primary" disableElevation>
                Register For Hackathon
              </Button>
            </Link>
            <Button className="nm-btn-secondary" onClick={() => scrollToSection('timeline')}>
              Revisit Timeline
            </Button>
          </Stack>
        </Box>
      </Box>

    </Box>
  );
};

export default NombaHackathon;
