// reference: https://www.hko.gov.hk/textonly/v2/explain/wxicon_e.htm
export const HKO_ICON_IMAGE_BASE =
  "https://www.hko.gov.hk/images/HKOWxIconOutline";

export const getHkoIconImageUrl = (iconCode: number): string =>
  `${HKO_ICON_IMAGE_BASE}/pic${iconCode}.png`;
