import '@testing-library/jest-dom';
import '@/app/__mocks__/__shared-components__/vercel-speed-insights';
import '@/app/__mocks__/__shared-components__/vercel-analytics';
import '@/app/__mocks__/next/image/image';

import { TextEncoder, TextDecoder as NodeTextDecoder } from 'util';

if (typeof globalThis.TextEncoder === 'undefined') globalThis.TextEncoder = TextEncoder;

if (typeof globalThis.TextDecoder === 'undefined') globalThis.TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;

// React 19 server rendering in jsdom needs MessageChannel; a stub avoids open handles
if (typeof globalThis.MessageChannel === 'undefined') {
  globalThis.MessageChannel = class {
    port1 = { onmessage: null as null | (() => void), postMessage() {}, close() {} };
    port2 = { postMessage: () => setTimeout(() => this.port1.onmessage?.(), 0), close() {} };
  } as unknown as typeof MessageChannel;
}
