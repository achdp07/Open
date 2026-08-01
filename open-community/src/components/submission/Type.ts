export interface SubmissionForm {
  team_name: string;

  dataset_used: string;

  project_link: string;

  project_document: File | null;

  visual_assets: File[];
}