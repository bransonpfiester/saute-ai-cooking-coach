'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  customColor: string;
  setTheme: (theme: 'light' | 'dark') => void;
  setCustomColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [customColor, setCustomColor] = useState('#6366f1'); // Default indigo

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('saute-theme') as 'light' | 'dark';
    const savedColor = localStorage.getItem('saute-custom-color');
    
    if (savedTheme) {
      setTheme(savedTheme);
    }
    if (savedColor) {
      setCustomColor(savedColor);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Set CSS custom properties for the custom color
    const rgb = hexToRgb(customColor);
    if (rgb) {
      root.style.setProperty('--custom-color', customColor);
      root.style.setProperty('--custom-color-rgb', `${rgb.r}, ${rgb.g}, ${rgb.b}`);
      root.style.setProperty('--custom-color-50', lightenColor(customColor, 95));
      root.style.setProperty('--custom-color-100', lightenColor(customColor, 90));
      root.style.setProperty('--custom-color-500', customColor);
      root.style.setProperty('--custom-color-600', darkenColor(customColor, 10));
      root.style.setProperty('--custom-color-700', darkenColor(customColor, 20));
    }

    // Save to localStorage
    localStorage.setItem('saute-theme', theme);
    localStorage.setItem('saute-custom-color', customColor);
  }, [theme, customColor]);

  return (
    <ThemeContext.Provider value={{ theme, customColor, setTheme, setCustomColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper functions
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function lightenColor(color: string, percent: number) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const r = Math.round(rgb.r + (255 - rgb.r) * (percent / 100));
  const g = Math.round(rgb.g + (255 - rgb.g) * (percent / 100));
  const b = Math.round(rgb.b + (255 - rgb.b) * (percent / 100));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function darkenColor(color: string, percent: number) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const r = Math.round(rgb.r * (1 - percent / 100));
  const g = Math.round(rgb.g * (1 - percent / 100));
  const b = Math.round(rgb.b * (1 - percent / 100));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
