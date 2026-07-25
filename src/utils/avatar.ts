export interface AvatarColorPair {
  bg: string;
  text: string;
}

export const getInitials = (name?: string, fallback: string = 'C'): string => {
  if (!name) return fallback;
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + (parts.at(-1)?.charAt(0) || '')).toUpperCase();
};

export const getAvatarColors = (name: string, palette: AvatarColorPair[]): AvatarColorPair => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + (name.codePointAt(i) ?? 0)) % 1000000;
  }
  const idx = Math.abs(hash) % palette.length;
  return palette[idx];
};
