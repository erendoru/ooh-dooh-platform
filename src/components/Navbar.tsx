"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Menu, X, User, ChevronDown, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, isBillboardOwner, loading, refreshUser } = useAuth();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCartItemCount = useCallback(async () => {
    if (!user) return;
    try {
      const { data: carts } = await supabase
        .from("carts")
        .select("id", { count: "exact" })
        .eq("user_id", user.id);

      const { data, error, count } = await supabase
        .from("cart_items")
        .select("id", { count: "exact" })
        .eq("cart_id", carts?.[0]?.id);

      if (error) throw error;
      setCartItemCount(count || 0);
    } catch (error) {
      console.error("Error fetching cart item count:", error);
    }
  }, [user]);
  useEffect(() => {
    fetchCartItemCount();
  }, [fetchCartItemCount]);

  useEffect(() => {
    window.addEventListener("cartUpdated", fetchCartItemCount);
    return () => {
      window.removeEventListener("cartUpdated", fetchCartItemCount);
    };
  }, [fetchCartItemCount]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      await refreshUser();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const closeMenus = () => {
    setShowMenu(false);
    setShowMobileMenu(false);
    setActiveDropdown(null);
  };

  useEffect(() => {
    refreshUser();
  }, [pathname, refreshUser]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 300);
  };

  const dropdownMenus = {
    uniteSahipleri: {
      left: [
        { label: "Pano Yükle", href: "/pano-yukle" },
        { label: "Panolarım", href: "/my-billboards" },
        { label: "Analiz", href: "/analiz" },
      ],
      right: [
        { label: "Faydaları", href: "/unite-faydalari" },
        { label: "Başarı Hikayeleri", href: "/unite-basari-hikayeleri" },
      ],
    },
    reklamVerenler: {
      left: [
        { label: "Pano Kirala", href: "/pano-kirala" },
        { label: "Reklam Ver", href: "/reklam-ver" },
        { label: "Kampanyalarım", href: "/kampanyalarim" },
      ],
      right: [
        { label: "Avantajlar", href: "/reklam-veren-avantajlari" },
        { label: "Vaka Çalışmaları", href: "/vaka-calismalari" },
      ],
    },
  };

  return (
    <nav
      className="bg-white shadow-md z-10"
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0" onClick={closeMenus}>
              <span className="text-2xl font-bold text-[#3B82F6]">PANOM</span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {Object.entries(dropdownMenus).map(([key, items]) => (
                  <div
                    key={key}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => handleMouseEnter(key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                      {key === "uniteSahipleri"
                        ? "Ünite Sahipleri"
                        : "Reklam Verenler"}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    {activeDropdown === key && (
                      <div
                        className="absolute left-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                        onMouseEnter={() => {
                          if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                          }
                        }}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div
                          className="py-1 flex"
                          role="menu"
                          aria-orientation="horizontal"
                        >
                          <div className="w-1/2 border-r">
                            <h3 className="px-4 py-2 text-sm font-semibold">
                              {key === "uniteSahipleri"
                                ? "Ünite İşlemleri"
                                : "Reklam İşlemleri"}
                            </h3>
                            {items.left.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={closeMenus}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <div className="w-1/2">
                            <h3 className="px-4 py-2 text-sm font-semibold">
                              {key === "uniteSahipleri"
                                ? "Faydaları"
                                : "Avantajlar"}
                            </h3>
                            {items.right.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={closeMenus}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/reklam-ver"
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenus}
                >
                  Panom
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {loading ? (
                <div className="text-gray-700">Yükleniyor...</div>
              ) : user ? (
                <div className="relative flex">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center"
                  >
                    <User className="h-8 w-8 rounded-full text-gray-700" />
                    <span className="ml-2 text-gray-700">{user.email}</span>
                  </button>
                  <Link href="/cart" className="mr-4 relative">
                    <ShoppingCart className="h-7 w-8 text-gray-700" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                  {showMenu && (
                    <div className="absolute right-0 top-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeMenus}
                        >
                          Profil
                        </Link>
                        <Link
                          href="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeMenus}
                        >
                          Dashboard
                        </Link>
                        {isBillboardOwner && (
                          <>
                            <Link
                              href="/analiz"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={closeMenus}
                            >
                              Analiz
                            </Link>
                            <Link
                              href="/pano-yukle"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={closeMenus}
                            >
                              Pano Yükle
                            </Link>
                            <Link
                              href="/my-billboards"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={closeMenus}
                            >
                              Panolarım
                            </Link>
                          </>
                        )}
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenus}
                >
                  Giriş Yap
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {showMobileMenu ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {Object.entries(dropdownMenus).map(([key, items]) => (
              <div key={key} className="space-y-1">
                <button
                  onClick={() =>
                    setActiveDropdown(activeDropdown === key ? null : key)
                  }
                  className="w-full text-left text-gray-700 hover:bg-gray-100  px-3 py-2 rounded-md text-base font-medium flex items-center justify-between"
                >
                  {key === "uniteSahipleri"
                    ? "Ünite Sahipleri"
                    : "Reklam Verenler"}
                  <ChevronDown
                    className={`ml-1 h-4 w-4 transform ${
                      activeDropdown === key ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === key && (
                  <div className="pl-4">
                    <div className="mb-2">
                      <h3 className="px-3 py-2 text-sm font-semibold">
                        {key === "uniteSahipleri"
                          ? "Ünite İşlemleri"
                          : "Reklam İşlemleri"}
                      </h3>
                      {items.left.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-sm"
                          onClick={closeMenus}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div>
                      <h3 className="px-3 py-2 text-sm font-semibold">
                        {key === "uniteSahipleri" ? "Faydaları" : "Avantajlar"}
                      </h3>
                      {items.right.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-sm"
                          onClick={closeMenus}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/reklam-ver"
              className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenus}
            >
              Panom
            </Link>
          </div>
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <User className="h-10 w-10 rounded-full text-gray-700" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-gray-700">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenus}
                >
                  Profil
                </Link>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeMenus}
                >
                  Dashboard
                </Link>
                {isBillboardOwner && (
                  <>
                    <Link
                      href="/analiz"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      Analiz
                    </Link>
                    <Link
                      href="/pano-yukle"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      Pano Yükle
                    </Link>
                    <Link
                      href="/my-billboards"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      Panolarım
                    </Link>
                  </>
                )}
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="px-2 space-y-1">
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-[#3B82F6] hover:bg-gray-100"
                  onClick={closeMenus}
                >
                  Giriş Yap
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
