"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar: React.FC = () => {
  const { user, isBillboardOwner, loading, refreshUser } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await refreshUser();
    router.push("/");
  };

  const closeMenus = () => {
    setShowMenu(false);
    setShowMobileMenu(false);
  };

  useEffect(() => {
    refreshUser();
  }, [pathname, refreshUser]);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-[#3B82F6]"
              onClick={closeMenus}
            >
              PANOM
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/pano-ucret"
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenus}
                >
                  PANO&ÜCRET
                </Link>
                <Link
                  href="/pano-kirala"
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenus}
                >
                  PANO KİRALA
                </Link>
                <Link
                  href="/reklam-ver"
                  className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenus}
                >
                  REKLAM VER
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {loading ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 h-8 w-8"></div>
                  <div className="h-2 bg-slate-200 rounded"></div>
                </div>
              ) : !user ? (
                <Link
                  href="/login"
                  className="text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeMenus}
                >
                  Giriş Yap
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="flex items-center"
                  >
                    <img
                      src={
                        user.user_metadata.avatar_url || "/default-avatar.png"
                      }
                      alt="Profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <span className="ml-2 text-gray-700">
                      {user.user_metadata.name || user.email}
                    </span>
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                          <Link
                            href="/my-billboards"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={closeMenus}
                          >
                            Panolarım
                          </Link>
                        )}
                        <Link
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeMenus}
                        >
                          Ayarlar
                        </Link>
                        <button
                          onClick={() => {
                            handleSignOut();
                            closeMenus();
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  )}
                </div>
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
            <Link
              href="/pano-ucret"
              className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenus}
            >
              PANO&ÜCRET
            </Link>
            <Link
              href="/pano-kirala"
              className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenus}
            >
              PANO KİRALA
            </Link>
            <Link
              href="/reklam-ver"
              className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium"
              onClick={closeMenus}
            >
              REKLAM VER
            </Link>
          </div>
          {loading ? (
            <div className="px-2 pt-2 pb-3 border-t border-gray-700">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            user && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        user.user_metadata.avatar_url || "/default-avatar.png"
                      }
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-700">
                      {user.user_metadata.name || user.email}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-500">
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
                    <Link
                      href="/my-billboards"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      Panolarım
                    </Link>
                  )}
                  <Link
                    href="/settings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    onClick={closeMenus}
                  >
                    Ayarlar
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      closeMenus();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
