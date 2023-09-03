import getConfig from 'next/config';

const { ROOT_APP = '' } = getConfig().serverRuntimeConfig as Record<string, string | undefined>;

export default async function getProfile() {
  const data = await fetch(`${ROOT_APP}/api/profile`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(async (res) => {
    if (res.ok) {
      return res;
    }
    const body = await res.json();
    throw new Error(body.message);
  });
  return data.json();
}
