export type Movie = {
  id: string;
  title: string;
  thumbnail: string;
  shared_by: string;
  description: string;
  up_vote?: number;
  down_vote?: number;
};

export type MovieSession = Omit<Movie, "shared_by">