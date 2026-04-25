const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
// then fetch(`${API_URL}/auth/login`...)


export const api = {
  register: async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role?: string;
  }) => {
    const res = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, role: 'STUDENT' }),
    });
    return res.json();
  },

  login: async (data: { email: string; password: string }) => {
    // Fetch user by email
    const res = await fetch(
      `${BASE_URL}/users?email=${data.email}&password=${data.password}`
    );
    const users = await res.json();

    if (users.length === 0) {
      throw new Error('Email ou mot de passe incorrect');
    }

    const user = users[0];
    // Simulate a token
    const token = btoa(`${user.email}:${Date.now()}`);
    return { token, user };
  },

  getMe: async (token: string) => {
    const email = atob(token).split(':')[0];
    const res = await fetch(`${BASE_URL}/users?email=${email}`);
    const users = await res.json();
    return users[0] || null;
  },
};