export async function setPreferredLocale(locale) {
  const response = await fetch('/api/locale', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ locale }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to update locale');
  }

  return response.json();
}
