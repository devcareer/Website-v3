export const CERTIFICATE_WIDTH = 2000;
export const CERTIFICATE_HEIGHT = 1414;
export const CERTIFICATE_TEMPLATE_ASSET_PATH =
  'src/assets/Images/nomba-hackathon/certificate-template.png';
export const CERTIFICATE_NAME_X = 142;
export const CERTIFICATE_NAME_MAX_WIDTH = 794;
export const CERTIFICATE_NAME_MAX_FONT_SIZE = 96;
export const CERTIFICATE_NAME_WIDTH_RATIO = 0.45;

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

const getTextScale = ({
  characterCount,
  fontSize,
  targetWidth,
  widthRatio = CERTIFICATE_NAME_WIDTH_RATIO,
}) =>
  Number(
    (targetWidth / Math.max(1, characterCount * fontSize * widthRatio)).toFixed(
      4
    )
  );

export const getCertificateNameMetrics = (name) => {
  const characterCount = Math.max(normalizeCertificateName(name).length, 1);
  const fontSize = Math.min(
    CERTIFICATE_NAME_MAX_FONT_SIZE,
    CERTIFICATE_NAME_MAX_WIDTH / (characterCount * CERTIFICATE_NAME_WIDTH_RATIO)
  );
  const roundedFontSize = Number(Math.max(16, fontSize).toFixed(2));
  const estimatedWidth =
    characterCount * roundedFontSize * CERTIFICATE_NAME_WIDTH_RATIO;
  const targetWidth = Math.min(
    CERTIFICATE_NAME_MAX_WIDTH,
    Math.max(280, estimatedWidth)
  );

  return {
    fontSize: roundedFontSize,
    scaleX: getTextScale({
      characterCount,
      fontSize: roundedFontSize,
      targetWidth,
    }),
    y: roundedFontSize < 52 ? 556 : roundedFontSize < 82 ? 574 : 592,
  };
};

export const getCertificateFileName = (name, extension = 'png') => {
  const slug = normalizeCertificateName(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `nomba-hackathon-certificate-${slug || 'participant'}.${extension}`;
};

const getTemplateImage = (certificateAsset) =>
  typeof certificateAsset === 'string'
    ? certificateAsset
    : certificateAsset?.template || '';

export const buildCertificateSvg = (recipientName, certificateAsset) => {
  const displayName =
    normalizeCertificateName(recipientName) || 'Participant Name';
  const name = escapeXml(displayName);
  const templateImage = getTemplateImage(certificateAsset);
  const nameMetrics = getCertificateNameMetrics(displayName);

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" viewBox="0 0 ${CERTIFICATE_WIDTH} ${CERTIFICATE_HEIGHT}">
  <defs>
    <style>
      .certificate-name {
        font-family: "Arial Narrow", "Avenir Next Condensed", Impact, sans-serif;
        font-stretch: condensed;
        letter-spacing: 1px;
      }
    </style>
  </defs>

  <rect width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" fill="#ffffff"/>
  ${
    templateImage
      ? `<image href="${escapeXml(
          templateImage
        )}" x="0" y="0" width="${CERTIFICATE_WIDTH}" height="${CERTIFICATE_HEIGHT}" preserveAspectRatio="xMidYMid meet"/>`
      : `<rect x="${CERTIFICATE_NAME_X}" y="652" width="${CERTIFICATE_NAME_MAX_WIDTH}" height="4" fill="#2bbf55"/>`
  }

  <g transform="translate(${CERTIFICATE_NAME_X} ${nameMetrics.y}) scale(${
    nameMetrics.scaleX
  } 1)">
    <text x="0" y="0" class="certificate-name" font-size="${
      nameMetrics.fontSize
    }" font-weight="400" fill="#23bf59">${name}</text>
  </g>
</svg>`;
};
