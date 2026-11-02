# Flower Story Boutique

Site vitrine et boutique de Flower Story (פלאוור סטורי), studio floral premium à Rishon LeZion.
Next.js 16 · Tailwind 4 · Framer Motion · Lenis. Hébreu par défaut (RTL), anglais, français, espagnol.

## Commandes

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run media      # assets/<catégorie>/*.jpg → public/media (redimensionnées)
npm run contenu    # régénère CONTENU.md
```

## Où modifier quoi

- Textes : `locales/he.json`, `en.json`, `fr.json`, `es.json`
- Produits, prix, options, livraison, jours fermés, collections saisonnières : `data/products.json`
- Contact, adresse, horaires : `data/site.json`
- Avis clients : `data/reviews.json`
- Logo provisoire : `components/Logo.tsx`, `public/logo.svg`, `public/logo-he.svg`, `app/icon.svg`

Tant que `pricesConfirmed` vaut `false`, aucun prix n'est affiché et la commande part sur WhatsApp avec un récapitulatif complet.

## Variables d'environnement (Vercel)

| Variable | Rôle |
| --- | --- |
| `RESEND_API_KEY` | Envoi des e-mails (confirmation client, notification à Shir) |
| `ORDER_NOTIFY_EMAIL` | Adresse de Shir qui reçoit les commandes |
| `RESEND_FROM` | Expéditeur sur un domaine vérifié dans Resend |
| `NEXT_PUBLIC_PAYMENT_MODE` | `stripe` pour activer le paiement par carte (sinon WhatsApp seul) |
| `STRIPE_SECRET_KEY` | Clé Stripe (le paiement exige aussi `pricesConfirmed: true`) |

Pour un prestataire israélien (Cardcom, Tranzila, Grow), remplacer `app/api/checkout/route.ts`.
