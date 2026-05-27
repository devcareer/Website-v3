const TRACK_GROUPS = [
  {
    id: 'build',
    label: 'Build',
    headline: 'Build tracks for product teams shipping merchant-ready experiences.',
    summary:
      "These tracks focus on customer-facing products that use Nomba APIs to solve real Nigerian payment workflows from checkout to payouts.",
    focuses: [
      {
        id: 'checkout-recurring',
        number: 1,
        title: 'Checkout, Recurring',
        challenge:
          "Build a subscription or recurring-payment product using Nomba tokenised card and charge flows, including failed-charge handling, retries, dunning, and customer self-serve billing controls.",
        exampleBuilds: [
          'Streaming-service billing',
          'Gym memberships',
          'SaaS subscriptions for Nigerian SMEs',
          'Recurring tithes or donations',
          'Content-creator subscriptions',
        ],
        keyApis: ['Checkout API', 'Tokenised cards', 'Charge API', 'Webhooks'],
        judgedOn:
          'Unhappy-path depth: card decline, insufficient funds, expired card, pause or cancel handling, not only the happy path.',
      },
      {
        id: 'virtual-accounts-as-infrastructure',
        number: 2,
        title: 'Virtual Accounts as Infrastructure',
        challenge:
          'Use Nomba virtual accounts for per-customer payment collection where every customer gets a unique account number and inbound transfers reconcile automatically.',
        exampleBuilds: [
          'Landlord rent collection',
          'School fees per-student tracking',
          'Freelancer invoicing with unique account numbers',
          'Per-client wallets',
          'Ajo or esusu contribution tracking',
        ],
        keyApis: ['Virtual Account API', 'Transfers', 'Webhooks', 'Transactions API'],
        judgedOn:
          'Reconciliation logic quality, underpayment and overpayment handling, and customer-level reporting clarity.',
      },
      {
        id: 'webhook-native-applications',
        number: 3,
        title: 'Webhook-Native Applications',
        challenge:
          'Build a fully event-driven application where core business logic runs through webhook events with no polling and no manual reconciliation.',
        exampleBuilds: [
          'Real-time order fulfilment',
          'Instant payout triggers',
          'Automated receipt issuance',
          'Event-driven fraud-alert pipelines',
          'Marketplace settlement engines',
        ],
        keyApis: ['Webhooks', 'Checkout API', 'Transfers API', 'Transactions API'],
        judgedOn:
          'Idempotency, retry and recovery behavior, signature verification, event-flow observability, and production readiness of handlers.',
      },
      {
        id: 'integrations-and-plugins',
        number: 4,
        title: 'Integrations & Plugins',
        challenge:
          'Ship a production-grade Nomba payment integration for a commercially relevant platform without a strong integration today, or replace a weak one.',
        exampleBuilds: [
          'PrestaShop module',
          'OpenCart module',
          'Magento or Adobe Commerce module',
          'BigCommerce connector',
          'Wix or Webflow payment plugin',
          'Bubble or Zapier integration',
          'Xero, QuickBooks, or Zoho Books accounting connector',
        ],
        keyApis: ['Checkout API', 'Webhooks', 'Transfers', 'Refunds'],
        judgedOn:
          'Integration completeness (install, configure, transact, refund, webhook handling, error states), code quality, packaging, and documentation.',
      },
      {
        id: 'payouts-and-disbursements-at-scale',
        number: 5,
        title: 'Payouts & Disbursements at Scale',
        challenge:
          'Build a product that orchestrates outbound payments at scale including bulk transfers, marketplace splits, payroll, and gig-economy disbursements.',
        exampleBuilds: [
          'SME payroll tooling',
          'Ride-hailing or gig-economy payouts',
          'Marketplace seller settlement with split rules',
          'Affiliate commission disbursement',
          'Influencer payout platforms',
          'NGO or grant disbursement tools',
        ],
        keyApis: ['Transfers API', 'Transaction status', 'Webhooks', 'Balance or wallet APIs'],
        judgedOn:
          'Handling partial failures in batches, retry safety, beneficiary validation, audit trails, and operator UX for approvals, scheduling, and reversals.',
      },
      {
        id: 'conversational-whatsapp-commerce',
        number: 6,
        title: 'Conversational / WhatsApp Commerce',
        challenge:
          'Build a payment-capable flow inside conversational channels where buyers discover, order, and pay without leaving chat.',
        exampleBuilds: [
          'WhatsApp storefront for Nigerian SMEs',
          'USSD bill-payment menu',
          'Telegram restaurant-order bot',
          'SMS airtime or utility top-up flow',
          'AI assistant issuing checkout links in-chat',
        ],
        keyApis: ['Checkout API (payment links)', 'Virtual accounts', 'Webhooks', 'Transfers'],
        judgedOn:
          'Natural payment flow in conversation, drop-off fallback behavior, receipt and confirmation quality, and deployability for real SMEs.',
      },
      {
        id: 'ai-native-agentic-payments',
        number: 7,
        title: 'AI-Native / Agentic Payments',
        challenge:
          'Build a product where an AI agent (MCP, function-calling, or similar) initiates, authorizes, or reconciles payments with clear safety controls.',
        exampleBuilds: [
          "AI bookkeeper reconciling a merchant's Nomba transactions against invoices",
          'Agent paying recurring bills within user-defined limits',
          'AI procurement assistant issuing vendor payouts after approval',
          'MCP server exposing Nomba payment primitives to LLM clients',
        ],
        keyApis: ['Checkout API', 'Transfers API', 'Transactions API', 'Webhooks'],
        judgedOn:
          'Authority-model clarity, spend limits, circuit-breakers, auditability of agent-initiated actions, and practical time savings for real users.',
      },
      {
        id: 'stablecoin-on-off-ramps',
        number: 8,
        title: 'Stablecoin On/Off-Ramps (Naira <> USDC/USDT)',
        challenge:
          'Build a product moving value between Naira and stablecoins with Nomba on the fiat leg, covering on-ramp, off-ramp, or both.',
        exampleBuilds: [
          'Diaspora remittance flow from USDC to NGN virtual account',
          'Freelancer payout flow settling USD invoices to NGN via Nomba',
          'Merchant checkout that accepts USDC and settles NGN',
          'P2P NGN <> USDC marketplace with Nomba-held escrow',
        ],
        keyApis: ['Virtual Account API', 'Transfers', 'Webhooks', 'Transactions API'],
        judgedOn:
          'Fiat-leg accounting correctness, FX quote staleness and slippage handling, one-leg-failure fallback paths, and clear compliance assumptions.',
      },
      {
        id: 'prediction-markets',
        number: 9,
        title: 'Prediction Markets',
        challenge:
          'Build a prediction-market or peer-wagering product for Nigerian-relevant events with Nomba for deposits, escrow, payouts, and account statements.',
        exampleBuilds: [
          'Election and league outcome markets',
          'Exam result or weather markets',
          'In-group social bets settled via WhatsApp with escrow',
          'Settlement-engine SDK for licensed operators',
        ],
        keyApis: ['Virtual Account API', 'Transfers', 'Webhooks', 'Transactions API'],
        judgedOn:
          'Escrow and resolution integrity, plus explicit regulatory framing (licensed operator, social peer model, or public-good market).',
      },
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    headline: 'Infrastructure tracks for teams building reusable payment primitives.',
    summary:
      'These tracks prioritize platform services and finance operations layers that other product teams can integrate directly.',
    focuses: [
      {
        id: 'subscriptions-engine',
        number: 10,
        title: 'Subscriptions Engine',
        challenge:
          "Build a managed recurring-billing layer on top of Nomba's checkout and tokenised-card primitives for downstream product teams.",
        mustInclude: [
          'Plan management',
          'Billing cycles (monthly, annual, custom)',
          'Proration',
          'Dunning and failed-payment recovery',
          'Customer self-service portal',
          'Webhooks for downstream systems',
        ],
        keyApis: ['Checkout API', 'Tokenised cards', 'Charge API', 'Transfers'],
        whyThisMatters:
          'Nomba exposes payment primitives but does not ship a managed subscriptions layer, so teams repeatedly rebuild this capability from scratch.',
        judgedOn:
          'State-machine completeness, dunning sophistication, multi-tenant cleanliness, and API ergonomics for downstream developers.',
      },
      {
        id: 'dedicated-virtual-accounts',
        number: 11,
        title: 'Dedicated Virtual Accounts',
        challenge:
          'Build a persistent customer-named virtual-account system where each customer receives a dedicated account number tied to identity across transactions.',
        mustInclude: [
          'Account provisioning flow',
          'Inbound transfer reconciliation',
          'Customer-level statement and reporting',
          'Handling of misdirected payments',
          'Clean developer API for downstream integration',
        ],
        keyApis: ['Virtual Account API', 'Webhooks', 'Transactions API'],
        whyThisMatters:
          'Dedicated NUBAN-like experiences are core to Nigerian fintech UX, and a strong reusable primitive lowers build cost for multiple teams.',
        judgedOn:
          'Reconciliation accuracy, identity and naming model quality, edge-case handling (renames, closure, KYC tier changes), and developer API quality.',
      },
      {
        id: 'reconciliation-and-finance-ops',
        number: 12,
        title: 'Reconciliation & Finance Ops',
        challenge:
          'Build an accountant-grade reconciliation and finance-ops layer where the end user is a finance team, not a developer.',
        mustInclude: [
          'Automated matching of Nomba transactions against invoices, settlements, bank statements, or marketplace records',
          'Exception queues',
          'Chart-of-accounts mapping',
          'Export or sync with Xero, QuickBooks, Zoho Books, or Sage',
        ],
        keyApis: ['Transactions API', 'Webhooks', 'Settlements or balance APIs', 'Transfers'],
        whyThisMatters:
          'SMEs spend many manual hours reconciling transaction flows; a clean finance-ops layer turns a PSP integration into a system-of-record workflow.',
        judgedOn:
          'Matching accuracy, handling of partial or duplicate or refunded transactions, accountant UX, and depth of accounting tool integration.',
      },
      {
        id: 'fraud-risk-and-chargebacks',
        number: 13,
        title: 'Fraud, Risk & Chargebacks',
        challenge:
          'Build a real-time fraud and chargeback-defense layer that merchants can plug in for risk scoring, alerts, and evidence generation.',
        mustInclude: [
          'Rules engine or model for transaction scoring',
          'Velocity controls (per card, device, IP, customer)',
          'Webhook-driven enrichment',
          'Operator dashboard for review',
          'Chargeback evidence workflow',
        ],
        keyApis: ['Webhooks', 'Transactions API', 'Refunds', 'Customer or identity signals'],
        whyThisMatters:
          'Fraud and chargebacks are major margin leaks for online merchants, and many teams currently absorb losses or build brittle in-house tools.',
        judgedOn:
          'Signal quality and false-positive balance, scoring-path latency, explainability of decisions, and operator experience.',
      },
    ],
  },
];

const normalize = (value = '') =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const NOMBATRACK_GROUPS = TRACK_GROUPS;

export const TRACK_CATEGORY_OPTIONS = TRACK_GROUPS.map((group) => group.label);

export const TRACK_FOCUS_OPTIONS = TRACK_GROUPS.flatMap((group) =>
  group.focuses.map((focus) => ({
    ...focus,
    trackId: group.id,
    trackLabel: group.label,
  }))
);

export const getFocusOptionsForTrack = (trackLabel) => {
  const track = TRACK_GROUPS.find((group) => group.label === trackLabel);
  if (!track) {
    return [];
  }
  return track.focuses.map((focus) => focus.title);
};

const findTrack = (value = '') => {
  const clean = normalize(value);
  return TRACK_GROUPS.find((group) => group.id === clean || normalize(group.label) === clean);
};

const findFocus = (value = '') => {
  const clean = normalize(value);
  return TRACK_FOCUS_OPTIONS.find(
    (focus) => focus.id === clean || normalize(focus.title) === clean
  );
};

export const buildTrackRegistrationLink = (trackId, focusId) =>
  `/programs/nomba-hackathon/register?track=${encodeURIComponent(trackId)}&focus=${encodeURIComponent(focusId)}`;

export const parseTrackPrefillFromSearch = (search = '') => {
  const params = new URLSearchParams(search);
  const trackParam = params.get('track') || '';
  const focusParam = params.get('focus') || '';

  let track = findTrack(trackParam);
  let focus = findFocus(focusParam);

  if (focus && !track) {
    track = TRACK_GROUPS.find((group) => group.id === focus.trackId);
  }

  if (focus && track && focus.trackId !== track.id) {
    focus = null;
  }

  return {
    track: track ? track.label : '',
    focusArea: focus ? focus.title : '',
  };
};

