import React from 'react'

const ContactPage = () => {
  return (
    <div>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '25%' /* 4:1 aspect ratio */ }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4103.4516659949195!2d38.722608699999995!3d37.150998799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1534750032d105af%3A0x85d1b93284c93a85!2sAskaya%20H%C4%B1rdavat!5e1!3m2!1str!2str!4v1740654953774!5m2!1str!2str"
          width="100%"
          height="100%"
          style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div>
      <div className="mt-6 flex justify-center items-center">
        <form className="space-y-4 w-full max-w-7xl">
          <h2 className="text-xs text-start font-bold text-indigo-900 mb-4 text-[16px] leading-[24px] tracking-[0.2px]">İLETİŞİM FORMU</h2>
          <input
            type="text"
            placeholder="*Ad Soyad"
            className="w-full border p-3 rounded-md focus:outline-indigo-600"
          />
          <input
            type="tel"
            placeholder="*Telefon"
            className="w-full border p-3 rounded-md focus:outline-indigo-600"
          />
          <input
            type="email"
            placeholder="*E-Mail"
            className="w-full border p-3 rounded-md focus:outline-indigo-600"
          />
          <input
            type="text"
            placeholder="*Ürün Adı"
            className="w-full border p-3 rounded-md focus:outline-indigo-600"
          />
          <textarea
            placeholder="*Mesajınız"
            rows={4}
            className="w-full border p-3 rounded-md focus:outline-indigo-600"
          ></textarea>
          <div className="flex justify-start">
            <button
              type="submit"
              className="bg-mycolor27 text-white py-2 px-4 rounded-md hover:bg-mycolor27 transition transform hover:scale-105"
            >
              GÖNDER
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactPage