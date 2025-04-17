"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    product: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Adınızı giriniz";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "E-posta adresinizi giriniz";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Mesajınızı giriniz";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Gönderiliyor..." });

    try {
      console.log("Form gönderiliyor:", formData);
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Response'un JSON olup olmadığını kontrol et
      let data;
      try {
        data = await response.json();
      } catch (err) {
        console.error("JSON parse hatası:", err);
        throw new Error("Sunucu yanıtı geçersiz format içeriyor");
      }

      console.log("API yanıtı:", { status: response.status, data });

      if (!response.ok) {
        throw new Error(data.error || `Sunucu hatası: ${response.status}`);
      }

      setStatus({ type: "success", message: data.message || "Mesajınız başarıyla alındı! En kısa sürede size dönüş yapacağız." });
      setFormData({ name: "", email: "", product: "", message: "" });
    } catch (error) {
      console.error("Form gönderme hatası:", error);
      
      setStatus({ 
        type: "error", 
        message: error instanceof Error 
          ? `Hata: ${error.message}` 
          : "Mesaj gönderilirken bilinmeyen bir hata oluştu"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative"
        >
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 lg:p-12 relative z-10"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
              Bize Ulaşın
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınız"
                  className={`w-full p-4 border ${
                    errors.name ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-posta"
                  className={`w-full p-4 border ${
                    errors.email ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <input
                  type="text"
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  placeholder="İlgilendiğiniz Ürün (İsteğe bağlı)"
                  className={`w-full p-4 border ${
                    errors.product ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                />
                {errors.product && (
                  <p className="mt-1 text-sm text-red-500">{errors.product}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mesajınız"
                  className={`w-full p-4 border ${
                    errors.message ? "border-red-500" : "border-gray-200 dark:border-gray-700"
                  } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400`}
                  rows={5}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl ${
                    isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                </button>
              </motion.div>
            </form>
            {status.message && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-4 text-center text-sm ${
                  status.type === "error"
                    ? "text-red-500"
                    : status.type === "success"
                    ? "text-green-500"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {status.message}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            className="relative rounded-2xl overflow-hidden shadow-xl z-50"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20 z-10"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4103.4516659949195!2d38.722608699999995!3d37.150998799999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1534750032d105af%3A0x85d1b93284c93a85!2sAskaya%20H%C4%B1rdavat!5e1!3m2!1str!2str!4v1740654953774!5m2!1str!2str"
              className="w-full h-full min-h-[400px] rounded-2xl relative z-5"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
