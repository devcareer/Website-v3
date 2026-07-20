export const CERTIFICATE_WIDTH = 1366;
export const CERTIFICATE_HEIGHT = 972;
export const CERTIFICATE_NAME_MAX_WIDTH = 544;
export const CERTIFICATE_NAME_MAX_FONT_SIZE = 72;
export const CERTIFICATE_NAME_WIDTH_RATIO = 0.62;

export const CERTIFICATE_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const escapeXml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

export const normalizeCertificateName = (value) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim();

export const getCertificateNameMetrics = (name) => {
  const characterCount = Math.max(normalizeCertificateName(name).length, 1);
  const fontSize = Math.min(
    CERTIFICATE_NAME_MAX_FONT_SIZE,
    CERTIFICATE_NAME_MAX_WIDTH / (characterCount * CERTIFICATE_NAME_WIDTH_RATIO)
  );
  const roundedFontSize = Number(fontSize.toFixed(2));
  const estimatedWidth =
    characterCount * roundedFontSize * CERTIFICATE_NAME_WIDTH_RATIO;

  return {
    fontSize: roundedFontSize,
    textLength: Math.round(
      Math.min(CERTIFICATE_NAME_MAX_WIDTH, Math.max(220, estimatedWidth))
    ),
    y: roundedFontSize < 36 ? 382 : roundedFontSize < 56 ? 394 : 407,
  };
};

export const getCertificateFileName = (name, extension = 'png') => {
  const slug = normalizeCertificateName(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `nomba-hackathon-certificate-${slug || 'participant'}.${extension}`;
};

export const buildCertificateBrandLockup = (brandAssets) => {
  if (!brandAssets?.devCareer || !brandAssets?.nomba) {
    return `
    <g transform="translate(52 23)">
      <path d="M0 20L20 0L32 12L12 32Z" fill="none" stroke="#23bf59" stroke-width="4"/>
      <path d="M24 4L34 14M7 25L18 36" stroke="#23bf59" stroke-width="4" stroke-linecap="round"/>
      <text x="44" y="18" class="body" font-size="16" font-weight="800" fill="#151515">Dev</text>
      <text x="44" y="36" class="body" font-size="16" font-weight="800" fill="#151515">Career</text>
      <path d="M122 -2V42" stroke="#151515" stroke-width="3"/>
      <text x="148" y="26" class="body" font-size="21" font-weight="900" fill="#151515">nomba</text>
    </g>`;
  }

  return `
    <g transform="translate(52 24)">
      <image href="${brandAssets.devCareer}" x="0" y="3" width="98" height="35" preserveAspectRatio="xMinYMid meet"/>
      <path d="M122 -2V42" stroke="#151515" stroke-width="3"/>
      <image href="${brandAssets.nomba}" x="148" y="5" width="26" height="26" preserveAspectRatio="xMidYMid meet"/>
      <text x="180" y="26" class="body" font-size="21" font-weight="900" fill="#151515">nomba</text>
    </g>`;
};

export const buildCertificateSvg = (recipientName, brandAssets) => {
  const displayName =
    normalizeCertificateName(recipientName) || 'Participant Name';
  const name = escapeXml(displayName);
  const nameMetrics = getCertificateNameMetrics(displayName);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" viewBox="0 0 ${CERTIFICATE_WIDTH} ${CERTIFICATE_HEIGHT}">
  <defs>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#d5d9e6" flood-opacity="0.7"/>
    </filter>
    <pattern id="dotGrid" width="11" height="11" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.8" fill="#ffd94d"/>
    </pattern>
    <style>
      .body { font-family: Arial, Helvetica, sans-serif; }
      .display { font-family: Impact, Haettenschweiler, "Arial Narrow", sans-serif; font-stretch: condensed; }
      .mono { font-family: "IBM Plex Mono", "Courier New", monospace; }
      .badge-title { font-family: "IBM Plex Mono", "Courier New", monospace; font-weight: 500; }
      .signature { font-family: "Snell Roundhand", "Zapfino", "SignPainter", "Segoe Script", "Brush Script MT", cursive; font-style: normal; font-weight: 100; }
    </style>
  </defs>

  <rect width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" fill="#ffffff"/>
  <rect x="1304" width="62" height="544" fill="#2bbf55"/>
  <path d="M756 0H1304V710L1030 822L756 710Z" fill="#ffca05"/>

  <g fill="none" stroke="#ffdf72" stroke-width="2" opacity="0.9">
    <path d="M0 214V132L58 74H118"/>
    <path d="M0 138L84 54H368"/>
    <path d="M24 40C35 20 35 4 20 0"/>
    <path d="M6 33C31 56 67 31 44 6"/>
    <circle cx="25" cy="27" r="28"/>
    <circle cx="25" cy="27" r="18"/>
    <path d="M1320 706V790L1260 850H1194"/>
    <path d="M1366 820L1286 900H978"/>
    <path d="M1342 930C1328 952 1329 968 1348 972"/>
    <path d="M1360 940C1334 915 1296 941 1321 966"/>
    <circle cx="1328" cy="944" r="28"/>
    <circle cx="1328" cy="944" r="18"/>
    <path d="M1266 726V826M1282 712V810M1298 700V796"/>
    <path d="M1012 18H1168M1040 26H1206M534 14H592M548 22H642"/>
    <path d="M978 948H1198M1000 956H1284"/>
  </g>

  <rect x="98" y="72" width="68" height="42" fill="url(#dotGrid)" opacity="0.85"/>
  <rect x="96" y="449" width="544" height="4" fill="#2bbf55"/>
  <rect x="1010" y="20" width="74" height="14" fill="url(#dotGrid)" opacity="0.75"/>
  <rect x="1102" y="948" width="78" height="10" fill="url(#dotGrid)" opacity="0.75"/>

  <g class="body" fill="#111111">
    <text x="96" y="214" font-size="30" font-weight="500">This certificate is proudly</text>
    <text x="96" y="260" font-size="30" font-weight="500">presented to</text>

    <text x="96" y="${nameMetrics.y}" class="badge-title" font-size="${
    nameMetrics.fontSize
  }" textLength="${
    nameMetrics.textLength
  }" lengthAdjust="spacingAndGlyphs" fill="#2bbf55">${name}</text>

    <text x="96" y="508" font-size="24" font-weight="500">For Participating in the DevCareer x Nomba</text>
    <text x="96" y="542" font-size="24" font-weight="500">Hackathon 2026 in recognition of your dedication,</text>
    <text x="96" y="576" font-size="24" font-weight="500">creativity, and contribution to building innovative</text>
    <text x="96" y="610" font-size="24" font-weight="500">payment solutions for Nigeria.</text>
  </g>

  <g fill="#5d5d5d" opacity="0.4">
    <text x="92" y="796" class="signature" font-size="60" textLength="356" lengthAdjust="spacingAndGlyphs">Akintunde</text>
    <text x="112" y="802" class="signature" font-size="60" textLength="186" lengthAdjust="spacingAndGlyphs">Sultan</text>
  </g>
  <path d="M96 822H474" stroke="#2f67ff" stroke-width="3"/>
  <text x="96" y="866" class="body" font-size="30" font-weight="500" fill="#111111">Sultan Akintunde</text>
  <text x="96" y="906" class="body" font-size="22" font-weight="500" fill="#4c4c4c">Founder of DevCareer</text>

  <g transform="translate(858 78)" filter="url(#softShadow)">
    <rect x="0" y="0" width="344" height="128" rx="7" fill="#f7e982" stroke="#29b85a" stroke-width="2.6"/>
    ${buildCertificateBrandLockup(brandAssets)}
    <text x="172" y="104" text-anchor="middle" class="badge-title" font-size="43" textLength="286" lengthAdjust="spacingAndGlyphs" fill="#111111">HACKATHON 2026</text>
  </g>

  <text x="804" y="406" class="badge-title" font-size="96" font-weight="900" textLength="486" lengthAdjust="spacingAndGlyphs" fill="#ffffff" stroke="#ffffff" stroke-width="5" stroke-linejoin="round" paint-order="stroke">Certificate</text>
  <text x="822" y="486" class="badge-title" font-size="46" textLength="466" lengthAdjust="spacingAndGlyphs" fill="#ffffff">OF PARTICIPATION</text>
</svg>`;
};
