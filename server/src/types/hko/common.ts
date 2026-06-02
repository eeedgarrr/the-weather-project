export type HkoDataType =
  | "flw"
  | "fnd"
  | "rhrread"
  | "warnsum"
  | "warningInfo"
  | "swt";

export type HkoLang = "en" | "tc" | "sc";

export interface HkoQueryParams {
  dataType: HkoDataType;
  lang: HkoLang;
}
