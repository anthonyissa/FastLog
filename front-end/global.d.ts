// global.d.ts
interface Window {
  webln?: {
    isEnabled: () => Promise<boolean>;
  };
}
