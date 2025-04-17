import { NextResponse } from "next/server";
import { Resend } from 'resend';

// Resend API anahtarını ayarla (bu değeri .env.local dosyasına ekleyin)
// Resend'e kaydolup bir API anahtarı alın: https://resend.com
const resendApiKey = process.env.RESEND_API_KEY;
const resend = new Resend(resendApiKey);

export async function POST(req: Request) {
  try {
    // Gelen veriyi ayrıştır
    const body = await req.json().catch(() => null);
    
    if (!body) {
      console.error("Geçersiz JSON verisi alındı");
      return NextResponse.json({ error: "Geçersiz istek formatı" }, { status: 400 });
    }
    
    const { name, email, product, message } = body;

    // Tüm gerekli alanları kontrol et
    if (!name || !email || !message) {
      console.error("Eksik alanlar:", { name: !!name, email: !!email, message: !!message });
      return NextResponse.json({ error: "Tüm alanlar gereklidir." }, { status: 400 });
    }

    console.log("İletişim formu alındı:", { name, email, product });

    // Resend API anahtarının varlığını kontrol et
    if (!resendApiKey) {
      console.warn("Resend API anahtarı bulunamadı, e-posta gönderimi atlanıyor");
      // API anahtarı yoksa yine de başarılı yanıt döndür (test amacıyla)
      return NextResponse.json({ 
        message: "Mesajınız alındı! (Test modu: e-posta gönderilmedi)",
        details: "Gerçek e-posta gönderimi için Resend API anahtarı gerekiyor." 
      }, { status: 200 });
    }

    // Alıcı e-posta adresini ayarla
    const toEmail = process.env.CONTACT_EMAIL || 'muhasebe@askayagrup.com';
    
    // Konu satırını ayarla
    const subject = product 
      ? `Yeni İletişim Formu: ${name} - Ürün: ${product}`
      : `Yeni İletişim Formu Mesajı: ${name}`;

    // E-posta gönder
    console.log("E-posta gönderiliyor...");
    const { data, error } = await resend.emails.send({
      from: `İletişim Formu <onay@${process.env.RESEND_DOMAIN || 'resend.dev'}>`,
      to: toEmail,
      subject: subject,
      replyTo: email,
      text: `İsim: ${name}\nE-posta: ${email}${product ? '\nÜrün: ' + product : ''}\nMesaj: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #2563eb;">Yeni İletişim Formu Mesajı</h2>
          <p><strong>İsim:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          ${product ? `<p><strong>İlgilenilen Ürün:</strong> ${product}</p>` : ''}
          <p><strong>Mesaj:</strong> ${message}</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">Bu e-posta web sitenizin iletişim formundan otomatik olarak gönderilmiştir.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend e-posta gönderme hatası:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("E-posta başarıyla gönderildi, ID:", data?.id);

    return NextResponse.json({ 
      message: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
      success: true,
      id: data?.id
    }, { status: 200 });
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    
    // Hata detaylarını güvenli bir şekilde döndür
    let errorMessage = "E-posta gönderilirken bir hata oluştu.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
