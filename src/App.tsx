import { useState, useEffect } from "react";
import "./App.css";

import { axiosUnsplash } from "./helper/axios";

import SearchBar from "./components/SearchBar";
import Card from "./components/Card";

const App = () => {
  // const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<string>("");

  const handleSearchPhoto = async (search: string, page: string) => {
    try {
      if (history === "") setHistory(search);
      if (history !== "" && history !== search) {
        setHistory(search);
        setPhotos([]);
      }

      setIsLoading(true);

      const response = await axiosUnsplash.get(
        `/photos?page=${page}&query=${search}`
      );

      const results = response.data.results;

      setPhotos((prevItems) => [...prevItems, ...results]);
      // setSearch("");
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Get photo failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }

    setIsLoading(true);
    handleSearchPhoto(search, page.toString());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <div className="app">
      <SearchBar
        search={search}
        setSearch={setSearch}
        page={page}
        handleSearchPhoto={handleSearchPhoto}
      />
      <p
        style={{
          alignSelf: "flex-start",
          fontSize: "25px",
          fontWeight: "bold",
          margin: "100px 0",
        }}
      >
        You Search: {search}
      </p>
      <div
        className="card-container"
        style={{
          display: "flex",
          width: "100%",
          gap: 80,
          flexWrap: "wrap",
        }}
      >
        {photos.map((photo) => {
          return (
            <Card
              key={photo.id}
              image={photo.urls.regular}
              description={photo.alt_description}
            />
          );
        })}
      </div>
      {isLoading && (
        <p style={{ fontSize: "25px", margin: "5px 0" }}>Loading...</p>
      )}
    </div>
  );
};

export default App;
