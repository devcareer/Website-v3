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
        id: 'integrations-and-plugins',
        number: 3,
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
        number: 1,
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
        number: 2,
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

export const TOTAL_TRACK_GROUPS = TRACK_GROUPS.length;
export const TOTAL_TRACK_FOCUS_AREAS = TRACK_FOCUS_OPTIONS.length;

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
