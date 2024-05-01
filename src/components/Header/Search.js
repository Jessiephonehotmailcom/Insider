/** @format */

import SearchIcon from "@mui/icons-material/Search";
import { alpha, styled } from "@mui/material";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingLeft: "16px",
    transition: theme.transitions.create("width"),
    width: "16ch",
    "&:focus": {
      width: "20ch",
    },
    color: "white",
  },
}));

const StyledInputBaseMobile = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingLeft: "8px",
    paddingRight: "8px",
    transition: theme.transitions.create("width"),
    color: "white",
  },
}));

const Search = () => {
  const isMobile = window.innerWidth < 768;
  const [searchInput, setSearchInput] = useState("");
  const setPeople = useStoreActions((actions) => actions.people.setPeople);
  const { setSearchData } = useStoreActions((actions) => actions.searchTable);
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPeople(null);

    fetch(`/api/Search/GetSearchResult?searchQuery=${searchInput}`)
      .then((response) => response.json())
      .then((data) => {
        setPeople(data);
        setSearchData(data?.licenses?.data?.$values);
        history.push({ pathname: "/People" });
      })
      .catch((error) => {
        history.push({ pathname: "/People" });
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <form className="App" onSubmit={handleSubmit}>
      {!isMobile && (
        <Box
          sx={{
            backgroundColor: alpha("#fff", 0.2),
            display: "flex",
            alignItems: "center",
            borderRadius: 24,
            padding: "4px",
          }}
        >
          <StyledInputBase placeholder="search" onChange={handleChange} />
          <SearchIcon
            fontSize="large"
            sx={{
              transform: "rotate(90deg)",
            }}
            onClick={handleSubmit}
          />
        </Box>
      )}

      {isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: alpha("#fff", 0.2),
              display: "flex",
              alignItems: "center",
              borderRadius: 24,
              padding: "4px",
              width: "160px",
            }}
          >
            <StyledInputBaseMobile
              placeholder="search"
              onChange={handleChange}
            />
          </Box>
          <SearchIcon
            fontSize="large"
            sx={{
              transform: "rotate(90deg)",
              color: "white",
            }}
            onClick={handleSubmit}
          />
        </Box>
      )}
    </form>
  );
};

export default Search;
