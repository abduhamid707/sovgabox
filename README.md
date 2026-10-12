# Sovg‘aBox 🎁

Oddiy sovg‘a emas — o‘zing yaratgan taassurot.

Premium mobile-first React + Vite frontend demo. No real orders, backend, payments, or delivery integration.

## Local development

Run these commands:
1. git clone https://github.com/abduhamid707/sovgabox.git
2. cd sovgabox
3. npm ci
4. npm run dev

Vite normally serves at http://localhost:5173. Node.js 20+ recommended.
Production validation: npm run build, then npm run preview.

## Structure

- src/components/Storefront.tsx — shared UI
- src/components/VirtualGiftBox.tsx — animated virtual Gift Studio preview
- src/data/catalog.ts — mock catalog and boxes
- src/store/useStore.ts — persisted cart, builder, favorites and orders
- src/pages/ — route components including Builder.tsx and builder.css
- src/App.tsx — React Router and lazy-loaded routes

## Gift Builder demo checklist

1. Open /builder and select products; count and total update immediately.
2. Open/close the virtual box. Its visual arrangement does not imply physical dimensions.
3. Add, remove, and adjust product quantities; reload to verify persistence.
4. Write a greeting and verify the message updates in the live card.
5. On mobile, scroll to products; the sticky summary is shown when you have a selection.
6. Move to cart; products transfer once and the builder resets.
7. Complete demo checkout and review the local order in /orders.

## Business rules

- Virtual box is decorative. No physical box-capacity or size validation.
- Actual packaging type, pricing and delivery are confirmed by an operator in a later production phase.
- All current item names, images and prices are mock data.
- Demo checkout stores details in localStorage only. Do not enter real personal information for testing.
- Backend, admin, Payme and Yandex Go integration are not implemented.

CI: .github/workflows/frontend-ci.yml runs npm ci and npm run build on pushes.