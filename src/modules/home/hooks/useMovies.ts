import { useState, useCallback } from "react";

export const useMovies = () => {
  const movies = useState([]);
  const period = useState({
    page: 0,
    limited: false,
    pageSize: 20,
    refresh: false,
    loadMore: false
  });

  const getMovies = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/movies");
      const data = await response.json();
      movies[1](data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return {
    movies,
    period,
  }
};
