export interface Job {
  id: string;
  headline: string;
  employer?: { name?: string };
  workplace_address?: { municipality?: string; region?: string };
  description?: { text?: string };
  webpage_url?: string;
  logo_url?: string;
}
