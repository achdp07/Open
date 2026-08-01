const BASE_URL = import.meta.env.VITE_API_URL;
export interface HackathonSubmissionPayload {
  team_name: string;
  dataset_used: string;
  project_document_url: string;
  visual_assets_urls: string[];
  project_link?: string | null;
}

export async function submitHackathonProject(
  eventSlug: string,
  payload: HackathonSubmissionPayload
) {
  const response = await fetch(
    `${BASE_URL}/api/events/${eventSlug}/hackathon-submissions/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw await response.json();
  }

  return response.json();
}