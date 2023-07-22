import { memo } from "react";
import Header from "@/modules/auth/components/Header";
import MovieList from "../components/MovieList";
import 'react-loading-skeleton/dist/skeleton.css'

const HomePage = () => {
  return (
    <div className="home-container w-full">
      <Header />
      <MovieList />
    </div>
  );
};

export default memo(HomePage);
