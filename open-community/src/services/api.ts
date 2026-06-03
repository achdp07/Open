const BASE_URL = import.meta.env.VITE_API_URL;

// Helper to get auth headers
const authHeaders = () => {
  const access = localStorage.getItem('access');
  return {
    'Content-Type': 'application/json',
    ...(access ? { Authorization: `Bearer ${access}` } : {}),
  };
};

// Helper to handle responses
const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(error));
  }
  if (res.status === 204) return null;
  return res.json();
};

export const api = {

  // ─── AUTH ───────────────────────────────────────────

  login: async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(res);
    // returns { access, refresh }
  },

  refreshToken: async (refresh: string) => {
    const res = await fetch(`${BASE_URL}/api/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    return handleResponse(res);
    // returns { access, refresh }
  },

  register: async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    const res = await fetch(`${BASE_URL}/api/users/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  googleLogin: async (accessToken: string) => {
    const res = await fetch(`${BASE_URL}/api/users/google/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_token: accessToken }),
    });
    return handleResponse(res);
  },

  // ─── USER ───────────────────────────────────────────

  getDashboard: async () => {
    const res = await fetch(`${BASE_URL}/api/users/dashboard/`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
    // returns { user, stats, my_programs }
  },

  getProfile: async () => {
    const res = await fetch(`${BASE_URL}/api/users/profile/`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  updateProfile: async (data: Partial<{
    first_name: string;
    last_name: string;
    email: string;
  }>) => {
    const res = await fetch(`${BASE_URL}/api/users/profile/`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  getNotifications: async () => {
    const res = await fetch(`${BASE_URL}/api/users/notifications/`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // ─── COURSES ────────────────────────────────────────

  getPrograms: async () => {
    const res = await fetch(`${BASE_URL}/api/courses/programs/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(res);
    // returns [{ id, title, description, level, open_cohorts }]
  },

  getProgramById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/courses/programs/${id}/`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return handleResponse(res);
  },

  getModuleById: async (id: string) => {
    const res = await fetch(`${BASE_URL}/api/courses/modules/${id}/`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
    // returns { id, title, description, tasks: [{ id, title, task_type, media_assets }] }
  },

  getEventsDashboard: async () => {
    const res = await fetch(`${BASE_URL}/api/courses/events/dashboard/`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
    // returns { stats, events }
  },

  rsvpEvent: async (eventId: number) => {
    const res = await fetch(`${BASE_URL}/api/courses/events/${eventId}/rsvp/`, {
      method: 'POST',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  // ─── ASSESSMENTS ────────────────────────────────────

  enrollProgram: async (programId: number) => {
    const res = await fetch(`${BASE_URL}/api/assessments/enroll/${programId}/`, {
      method: 'POST',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  markProgress: async (data: {
    task_id?: number;
    module_id?: number;
  }) => {
    const res = await fetch(`${BASE_URL}/api/assessments/progress/`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  heartbeat: async (data: { task_id: number; seconds_watched: number }) => {
    const res = await fetch(`${BASE_URL}/api/assessments/progress/heartbeat/`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  submitAssignment: async (data: {
    task_id: number;
    submission_url: string;
  }) => {
    const res = await fetch(`${BASE_URL}/api/assessments/submissions/`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  // ─── COMMUNITY ──────────────────────────────────────

  getPosts: async () => {
    const res = await fetch(`${BASE_URL}/api/community/posts/`, {
      headers: authHeaders(),
    });
    return handleResponse(res);
    // returns [{ id, author_name, content, created_at, like_count, comments }]
  },

  createPost: async (content: string) => {
    const res = await fetch(`${BASE_URL}/api/community/posts/`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ content }),
    });
    return handleResponse(res);
  },

  updatePost: async (postId: number, content: string) => {
    const res = await fetch(`${BASE_URL}/api/community/posts/${postId}/`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ content }),
    });
    return handleResponse(res);
  },

  deletePost: async (postId: number) => {
    const res = await fetch(`${BASE_URL}/api/community/posts/${postId}/`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },

  commentPost: async (postId: number, content: string) => {
    const res = await fetch(
      `${BASE_URL}/api/community/posts/${postId}/comments/`,
      {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ content }),
      }
    );
    return handleResponse(res);
  },

  likePost: async (postId: number) => {
    const res = await fetch(
      `${BASE_URL}/api/community/posts/${postId}/like/`,
      {
        method: 'POST',
        headers: authHeaders(),
      }
    );
    return handleResponse(res);
    // returns { detail, liked: true/false }
  },
};