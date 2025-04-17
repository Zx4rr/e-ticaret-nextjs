# E-Ticaret Next.js Projesi

Modern ve yüksek performanslı bir e-ticaret çözümü.

## İletişim Formu Kurulumu

Proje içinde yer alan iletişim formu, e-posta gönderimi için Resend API'yi kullanmaktadır. Gerçek e-posta gönderimini etkinleştirmek için şu adımları izleyin:

1. [Resend.com](https://resend.com) adresinde ücretsiz bir hesap oluşturun
   - Ücretsiz plan günlük 100 e-posta gönderme hakkı sunar
   - Kredi kartı gerektirmez

2. Resend hesabınızdan bir API anahtarı oluşturun
   - Dashboard > API Keys > Create API Key
   
3. Oluşturduğunuz API anahtarını projenizin `.env.local` dosyasına ekleyin:
   ```
   RESEND_API_KEY="re_sizinApiAnahtariniz"
   CONTACT_EMAIL="sizin@email.com"
   ```

4. (İsteğe bağlı) Kendi alan adınızı ekleyin:
   - Resend Dashboard > Domains > Add Domain adımlarını izleyin
   - Alan adınızı doğrulayın ve `.env.local` dosyasına ekleyin:
   ```
   RESEND_DOMAIN="alanadi.com"
   ```

Not: API anahtarı eklemezseniz, form yine de çalışır ancak gerçek e-posta gönderilmez (test modu).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
