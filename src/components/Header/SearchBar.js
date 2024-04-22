import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Search = styled('div')(({ theme }) => ({
  position: 'fixed',
  paddingTop: '-50px',
  // borderRadius: theme.shape.borderRadius,
  borderRadius: 25,
  backgroundColor: alpha(theme.palette.common.white, 0.95),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.95),
  },
  marginLeft: 0,
  // width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'grey',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();
  const setPeople = useStoreActions(actions => actions.people.setPeople);
  const { setSearchData, setRowCount } = useStoreActions((actions) => actions.searchTable);
  const people = useStoreState((state) => state.people);

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPeople(null);
    // console.log(`/api/Search/GetSearchResult?searchQuery=${searchInput}`);
    fetch(`/api/Search/GetSearchResult?searchQuery=${searchInput}`)
      .then(response => response.json())
      .then(data => {
        //console.log(data);
        setPeople(data);
        setSearchData(data?.licenses?.data?.$values);
        //setSearchData(data?.licenses?.data);
        history.push({ pathname: '/People' });
      })
      .catch(error => {
        history.push({ pathname: '/People' });
        console.error('Error fetching data: ', error);
      });
  };

  return (
    <form className="App" onSubmit={handleSubmit}>
      <AppBar position="static">
        <Search>
          <SearchIconWrapper>
            <SearchIcon color='secondary' />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={handleChange}
            value={searchInput}     
          />
        </Search>
      </AppBar>
    </form>
  );
}