export type Movie = {
  id: string;
  title: string;
  thumbnail: string;
  shared_by: string;
  description: string;
  youtube_id: string;
  created_date: number;
};

export type MovieSession = Omit<Movie, "shared_by" | "id" | "created_date">