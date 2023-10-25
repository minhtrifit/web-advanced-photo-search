interface Proptype {
  search: string;
  setSearch: any;
  page: number;
  handleSearchPhoto: (arg0: string, arg1: string) => void;
}

const SearchBar = (props: Proptype) => {
  const { search, setSearch, page, handleSearchPhoto } = props;

  return (
    <form
      style={{ display: "flex", gap: 15 }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchPhoto(search, page.toString());
      }}
    >
      <input
        style={{
          border: "1px solid gray",
          outline: 0,
          width: "300px",
          height: "40px",
          borderRadius: "5px",
          padding: "5px 15px",
          fontSize: "20px",
        }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        style={{
          border: 0,
          width: "80px",
          borderRadius: 5,
          color: "#fff",
          backgroundColor: "#8251b8",
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
