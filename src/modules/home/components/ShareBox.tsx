import React from "react";
import { useInput, Button } from "@/modules/base";
import { useMovies } from "../hooks/useMovies";

const ShareBox = () => {
  const { value: url, handleOnChange: handleSetUrl } = useInput("");
  const { shareMovie, isSharing } = useMovies();

  return (
    <div className="sharebox-container mt-[100px] flex items-center justify-center">
      <form
        className="sharebox-form border relative border-gray-300 rounded-large w-[600px] p-24"
        onSubmit={(e) => {
          e.preventDefault();          
          shareMovie(url || "");
        }}
      >
        <span className="sharebox-title absolute top-[-20px] bg-light-100 font-medium text-24 px-8">
          Share a Youtube movie
        </span>
        <div className="sharebox-url flex items-center font-medium my-24">
          <label className="mr-12" htmlFor="url">
            Youtube URL:
          </label>
          <input
            autoFocus
            name="url"
            type="text"
            className="border border-gray-300 rounded-large flex-1 p-8"
            value={url}
            onChange={handleSetUrl}
          />
        </div>
        <div className="sharebox-submit flex items-center justify-center">
          <Button isLoading={isSharing} className="w-full p-8" label="Share" name="submit" type="submit" isDisable={!url} />
        </div>
      </form>
    </div>
  );
};

export default ShareBox;
