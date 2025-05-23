// hooks/useThemeAware.ts
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

type ThemeAwareAssets = {
  light: string;
  dark: string;
};

export const useThemeAware = (assets: ThemeAwareAssets) => {
  const { theme, resolvedTheme } = useTheme();
  const [currentAsset, setCurrentAsset] = useState<string>("");

  useEffect(() => {
    const isDark = theme === 'dark' || resolvedTheme === 'dark';
    setCurrentAsset(isDark ? assets.dark : assets.light);
  }, [theme, resolvedTheme, assets.dark, assets.light]);

  return currentAsset;
};