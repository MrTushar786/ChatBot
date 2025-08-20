export interface Theme {
  name: string;
  id: string;
  description: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    radius: string;
    // AI Chat specific colors
    aiGradient: string;
    userGradient: string;
    chatBg: string;
    messageBg: string;
    userMessage: string;
    aiMessage: string;
    glow: string;
    sidebarBackground: string;
    sidebarForeground: string;
    sidebarPrimary: string;
    sidebarPrimaryForeground: string;
    sidebarAccent: string;
    sidebarAccentForeground: string;
    sidebarBorder: string;
    sidebarRing: string;
  };
}

export const themes: Theme[] = [
  {
    name: "Dark",
    id: "dark",
    description: "Classic dark theme with blue accents",
    colors: {
      background: "240 10% 3.9%",
      foreground: "0 0% 98%",
      card: "240 10% 3.9%",
      cardForeground: "0 0% 98%",
      popover: "240 10% 3.9%",
      popoverForeground: "0 0% 98%",
      primary: "217 91% 59%",
      primaryForeground: "0 0% 98%",
      secondary: "240 3.7% 15.9%",
      secondaryForeground: "0 0% 98%",
      muted: "240 3.7% 15.9%",
      mutedForeground: "240 5% 64.9%",
      accent: "270 95% 75%",
      accentForeground: "0 0% 98%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "210 40% 98%",
      border: "240 3.7% 15.9%",
      input: "240 3.7% 15.9%",
      ring: "217 91% 59%",
      radius: "0.75rem",
      aiGradient: "linear-gradient(135deg, 217 91% 59%, 270 95% 75%)",
      userGradient: "linear-gradient(135deg, 270 95% 75%, 217 91% 59%)",
      chatBg: "linear-gradient(180deg, 240 10% 3.9%, 240 8% 5%)",
      messageBg: "240 6% 10%",
      userMessage: "217 91% 59%",
      aiMessage: "240 6% 10%",
      glow: "217 91% 59% / 0.3",
      sidebarBackground: "240 5.9% 10%",
      sidebarForeground: "240 4.8% 95.9%",
      sidebarPrimary: "224.3 76.3% 48%",
      sidebarPrimaryForeground: "0 0% 100%",
      sidebarAccent: "240 3.7% 15.9%",
      sidebarAccentForeground: "240 4.8% 95.9%",
      sidebarBorder: "240 3.7% 15.9%",
      sidebarRing: "217.2 91.2% 59.8%",
    },
  },
  {
    name: "Light",
    id: "light",
    description: "Clean light theme with blue accents",
    colors: {
      background: "0 0% 100%",
      foreground: "240 10% 3.9%",
      card: "0 0% 100%",
      cardForeground: "240 10% 3.9%",
      popover: "0 0% 100%",
      popoverForeground: "240 10% 3.9%",
      primary: "217 91% 59%",
      primaryForeground: "0 0% 98%",
      secondary: "240 4.8% 95.9%",
      secondaryForeground: "240 5.9% 10%",
      muted: "240 4.8% 95.9%",
      mutedForeground: "240 3.8% 46.1%",
      accent: "270 95% 75%",
      accentForeground: "240 5.9% 10%",
      destructive: "0 84.2% 60.2%",
      destructiveForeground: "210 40% 98%",
      border: "240 5.9% 90%",
      input: "240 5.9% 90%",
      ring: "217 91% 59%",
      radius: "0.75rem",
      aiGradient: "linear-gradient(135deg, 217 91% 59%, 270 95% 75%)",
      userGradient: "linear-gradient(135deg, 270 95% 75%, 217 91% 59%)",
      chatBg: "linear-gradient(180deg, 0 0% 100%, 240 4.8% 95.9%)",
      messageBg: "240 4.8% 95.9%",
      userMessage: "217 91% 59%",
      aiMessage: "240 4.8% 95.9%",
      glow: "217 91% 59% / 0.3",
      sidebarBackground: "240 4.8% 95.9%",
      sidebarForeground: "240 5.9% 10%",
      sidebarPrimary: "224.3 76.3% 48%",
      sidebarPrimaryForeground: "0 0% 100%",
      sidebarAccent: "240 4.8% 95.9%",
      sidebarAccentForeground: "240 5.9% 10%",
      sidebarBorder: "240 5.9% 90%",
      sidebarRing: "217.2 91.2% 59.8%",
    },
  },
  {
    name: "Ocean",
    id: "ocean",
    description: "Deep ocean blue theme",
    colors: {
      background: "200 50% 8%",
      foreground: "200 10% 95%",
      card: "200 50% 10%",
      cardForeground: "200 10% 95%",
      popover: "200 50% 10%",
      popoverForeground: "200 10% 95%",
      primary: "200 80% 60%",
      primaryForeground: "200 50% 8%",
      secondary: "200 30% 15%",
      secondaryForeground: "200 10% 95%",
      muted: "200 30% 15%",
      mutedForeground: "200 20% 60%",
      accent: "180 80% 70%",
      accentForeground: "200 50% 8%",
      destructive: "0 70% 60%",
      destructiveForeground: "200 10% 95%",
      border: "200 30% 20%",
      input: "200 30% 20%",
      ring: "200 80% 60%",
      radius: "0.75rem",
      aiGradient: "linear-gradient(135deg, 200 80% 60%, 180 80% 70%)",
      userGradient: "linear-gradient(135deg, 180 80% 70%, 200 80% 60%)",
      chatBg: "linear-gradient(180deg, 200 50% 8%, 200 40% 12%)",
      messageBg: "200 40% 15%",
      userMessage: "200 80% 60%",
      aiMessage: "200 40% 15%",
      glow: "200 80% 60% / 0.3",
      sidebarBackground: "200 40% 12%",
      sidebarForeground: "200 10% 95%",
      sidebarPrimary: "200 80% 60%",
      sidebarPrimaryForeground: "200 50% 8%",
      sidebarAccent: "200 30% 20%",
      sidebarAccentForeground: "200 10% 95%",
      sidebarBorder: "200 30% 20%",
      sidebarRing: "200 80% 60%",
    },
  },
  {
    name: "Sunset",
    id: "sunset",
    description: "Warm sunset orange theme",
    colors: {
      background: "25 50% 8%",
      foreground: "25 10% 95%",
      card: "25 50% 10%",
      cardForeground: "25 10% 95%",
      popover: "25 50% 10%",
      popoverForeground: "25 10% 95%",
      primary: "25 80% 60%",
      primaryForeground: "25 50% 8%",
      secondary: "25 30% 15%",
      secondaryForeground: "25 10% 95%",
      muted: "25 30% 15%",
      mutedForeground: "25 20% 60%",
      accent: "45 80% 70%",
      accentForeground: "25 50% 8%",
      destructive: "0 70% 60%",
      destructiveForeground: "25 10% 95%",
      border: "25 30% 20%",
      input: "25 30% 20%",
      ring: "25 80% 60%",
      radius: "0.75rem",
      aiGradient: "linear-gradient(135deg, 25 80% 60%, 45 80% 70%)",
      userGradient: "linear-gradient(135deg, 45 80% 70%, 25 80% 60%)",
      chatBg: "linear-gradient(180deg, 25 50% 8%, 25 40% 12%)",
      messageBg: "25 40% 15%",
      userMessage: "25 80% 60%",
      aiMessage: "25 40% 15%",
      glow: "25 80% 60% / 0.3",
      sidebarBackground: "25 40% 12%",
      sidebarForeground: "25 10% 95%",
      sidebarPrimary: "25 80% 60%",
      sidebarPrimaryForeground: "25 50% 8%",
      sidebarAccent: "25 30% 20%",
      sidebarAccentForeground: "25 10% 95%",
      sidebarBorder: "25 30% 20%",
      sidebarRing: "25 80% 60%",
    },
  },
  {
    name: "Forest",
    id: "forest",
    description: "Natural green forest theme",
    colors: {
      background: "120 50% 8%",
      foreground: "120 10% 95%",
      card: "120 50% 10%",
      cardForeground: "120 10% 95%",
      popover: "120 50% 10%",
      popoverForeground: "120 10% 95%",
      primary: "120 80% 60%",
      primaryForeground: "120 50% 8%",
      secondary: "120 30% 15%",
      secondaryForeground: "120 10% 95%",
      muted: "120 30% 15%",
      mutedForeground: "120 20% 60%",
      accent: "90 80% 70%",
      accentForeground: "120 50% 8%",
      destructive: "0 70% 60%",
      destructiveForeground: "120 10% 95%",
      border: "120 30% 20%",
      input: "120 30% 20%",
      ring: "120 80% 60%",
      radius: "0.75rem",
      aiGradient: "linear-gradient(135deg, 120 80% 60%, 90 80% 70%)",
      userGradient: "linear-gradient(135deg, 90 80% 70%, 120 80% 60%)",
      chatBg: "linear-gradient(180deg, 120 50% 8%, 120 40% 12%)",
      messageBg: "120 40% 15%",
      userMessage: "120 80% 60%",
      aiMessage: "120 40% 15%",
      glow: "120 80% 60% / 0.3",
      sidebarBackground: "120 40% 12%",
      sidebarForeground: "120 10% 95%",
      sidebarPrimary: "120 80% 60%",
      sidebarPrimaryForeground: "120 50% 8%",
      sidebarAccent: "120 30% 20%",
      sidebarAccentForeground: "120 10% 95%",
      sidebarBorder: "120 30% 20%",
      sidebarRing: "120 80% 60%",
    },
  },
  {
    name: "Purple",
    id: "purple",
    description: "Royal purple theme",
    colors: {
      background: "270 50% 8%",
      foreground: "270 10% 95%",
      card: "270 50% 10%",
      cardForeground: "270 10% 95%",
      popover: "270 50% 10%",
      popoverForeground: "270 10% 95%",
      primary: "270 80% 60%",
      primaryForeground: "270 50% 8%",
      secondary: "270 30% 15%",
      secondaryForeground: "270 10% 95%",
      muted: "270 30% 15%",
      mutedForeground: "270 20% 60%",
      accent: "300 80% 70%",
      accentForeground: "270 50% 8%",
      destructive: "0 70% 60%",
      destructiveForeground: "270 10% 95%",
      border: "270 30% 20%",
      input: "270 30% 20%",
      ring: "270 80% 60%",
      radius: "0.75rem",
      aiGradient: "linear-gradient(135deg, 270 80% 60%, 300 80% 70%)",
      userGradient: "linear-gradient(135deg, 300 80% 70%, 270 80% 60%)",
      chatBg: "linear-gradient(180deg, 270 50% 8%, 270 40% 12%)",
      messageBg: "270 40% 15%",
      userMessage: "270 80% 60%",
      aiMessage: "270 40% 15%",
      glow: "270 80% 60% / 0.3",
      sidebarBackground: "270 40% 12%",
      sidebarForeground: "270 10% 95%",
      sidebarPrimary: "270 80% 60%",
      sidebarPrimaryForeground: "270 50% 8%",
      sidebarAccent: "270 30% 20%",
      sidebarAccentForeground: "270 10% 95%",
      sidebarBorder: "270 30% 20%",
      sidebarRing: "270 80% 60%",
    },
  },
];

export const defaultTheme = themes[0];
