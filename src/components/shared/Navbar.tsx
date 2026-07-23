'use client';
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl text-[#e17055] flex items-center">
            <span className="text-2xl mr-2">🏃‍♂️</span> SHOELAB <span className="text-gray-400 dark:text-slate-400 font-light ml-2 text-sm hidden sm:inline">| วิเคราะห์รองเท้าวิ่ง 2026</span>
          </div>

          <div className="flex items-center space-x-2 md:space-x-6 overflow-x-auto text-sm font-medium">
            <button onClick={() => scrollToSection('dashboard')} className="nav-link py-2 px-1 whitespace-nowrap text-gray-700 dark:text-slate-200 hover:text-[#e17055] dark:hover:text-[#e17055] transition-colors focus:outline-none">ภาพรวม</button>
            <button onClick={() => scrollToSection('catalog')} className="nav-link py-2 px-1 whitespace-nowrap text-gray-700 dark:text-slate-200 hover:text-[#e17055] dark:hover:text-[#e17055] transition-colors focus:outline-none">แคตตาล็อกรองเท้า</button>
            <button onClick={() => scrollToSection('battle')} className="nav-link py-2 px-1 whitespace-nowrap text-gray-700 dark:text-slate-200 hover:text-[#e17055] dark:hover:text-[#e17055] transition-colors focus:outline-none">เปรียบเทียบมวยคู่เอก</button>
            <button onClick={() => scrollToSection('alternatives')} className="nav-link py-2 px-1 whitespace-nowrap text-gray-700 dark:text-slate-200 hover:text-[#e17055] dark:hover:text-[#e17055] transition-colors focus:outline-none">รุ่นแนะนำอื่น</button>

            {/* Dark / Light Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-2 p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all focus:outline-none flex items-center justify-center border border-gray-200 dark:border-slate-700 shadow-sm"
              title={theme === 'dark' ? 'เปลี่ยนเป็น Light Mode' : 'เปลี่ยนเป็น Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun size={18} className="text-amber-400 animate-spin-once" />
              ) : (
                <Moon size={18} className="text-indigo-600 animate-pulse" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
