"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-16 md:py-24 rounded">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
            Reklam Kampanyanızı Bugün Başlatın
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Türkiye'nin en geniş pano ağıyla markanızı milyonlara ulaştırın.
            Hemen hesap oluşturun ve kampanyanızı planlamaya başlayın.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="secondary"
              size="lg"
              className="text-purple-600 bg-white hover:bg-gray-100 transition-colors duration-300"
              onClick={() =>
                window.open(
                  "https://calendly.com/erendoru/30dk",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Hemen Toplantı Oluştur
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
