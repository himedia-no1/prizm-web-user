export const generateInviteCode = () => Math.random().toString(36).slice(2, 10).toUpperCase();

export const buildInviteLink = (mode, channelId) => {
  const code = generateInviteCode();
  const base = mode === 'guest' ? 'guest' : 'member';
  const channelSegment = channelId ? `${channelId}/` : '';
  return {
    id: `${base}-${code}`,
    url: `https://prizm.app/invite/${base}/${channelSegment}${code}`,
    code,
  };
};

export const optionLabel = (key, map, fallback) => map?.[key] ?? fallback?.[key] ?? key;

export const multiSelectToggle = (current, id) => {
  if (current.includes(id)) {
    return current.filter((value) => value !== id);
  }
  return [...current, id];
};
