const BASE = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('nga_token');
  const res = await fetch(BASE + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong.');
  return data;
}

export const api = {
  signup: (payload) => request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  addChild: (payload) => request('/children', { method: 'POST', body: JSON.stringify(payload) }),
  childLogin: (payload) => request('/children/login', { method: 'POST', body: JSON.stringify(payload) }),
  getChildren: () => request('/children'),
  getTrackA: () => request('/curriculum/track-a'),
  getTrackB: () => request('/curriculum/track-b'),
  sendChat: (payload) => request('/chat', { method: 'POST', body: JSON.stringify(payload) }),
};
