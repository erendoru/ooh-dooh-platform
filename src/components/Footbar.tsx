import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold mb-4">PANOM</h2>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Linkedin size={24} />
              </a>
            </div>
            <button
              className="bg-[#3B82F6] text-white mt-5 p-3 rounded-full font-semibold hover:bg-[#2563EB] transition duration-300"
              onClick={() =>
                window.open(
                  "https://calendly.com/erendoru/30dk",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              Demo Rezervasyon
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Ürünler</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/acik-hava-reklamciligi"
                  className="hover:text-blue-400"
                >
                  Açık Hava Reklamcılığı
                </Link>
              </li>
              <li>
                <Link href="/dijital-panolar" className="hover:text-blue-400">
                  Dijital Panolar
                </Link>
              </li>
              <li>
                <Link
                  href="/billboard-kiralama"
                  className="hover:text-blue-400"
                >
                  Billboard Kiralama
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/neden-panom" className="hover:text-blue-400">
                  Neden Panom Platformu?
                </Link>
              </li>
              <li>
                <Link href="/panom-avantajlari" className="hover:text-blue-400">
                  Panom Avantajları
                </Link>
              </li>
              <li>
                <Link
                  href="/reklam-verenler-icin"
                  className="hover:text-blue-400"
                >
                  Reklam Verenler İçin
                </Link>
              </li>
              <li>
                <Link
                  href="/reklam-alanlar-icin"
                  className="hover:text-blue-400"
                >
                  Reklam Alanları İçin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Şirket</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="hover:text-blue-400">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/kariyer" className="hover:text-blue-400">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/programatik-reklamcilik"
                  className="hover:text-blue-400"
                >
                  Programatik Reklamcılık Merkezi
                </Link>
              </li>
              <li>
                <Link
                  href="/acik-hava-reklam-merkezi"
                  className="hover:text-blue-400"
                >
                  Açık Hava Reklam Merkezi
                </Link>
              </li>
              <li>
                <Link href="/yardim" className="hover:text-blue-400">
                  Yardım Merkezi
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik-politikasi"
                  className="hover:text-blue-400"
                >
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Panom. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
