/// <reference types="react-scripts" />
/// <reference types="@emotion/react/types/css-prop" />

interface Window {
  /** Google Tag Manager */
  dataLayer: Record<string, unknown>[];
  /** WorldPay */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  WPCL: any;
  __config?: {
    /** Locale the app will load in */
    defaultLocale: string;
  };
}
