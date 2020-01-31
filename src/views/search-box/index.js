import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { trans } from '../../utils';
import './search.scss';

const useStyles = makeStyles({
  divider: {
    height: 28,
    margin: 4,
    width: 1,
  },
  iconButton: {
    backgroundColor: '#fbe4cc',
    borderRadius: 0,
    color: '#ea7600',
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
  },
});

export default function SearchBox(props) {
  const classes = useStyles();
  const { title, clickHandler } = props;
  const [ searchValue, setSearchValue ] = useState('');

  return (
    <Paper className="search-box">
      <InputBase className={ classes.input } placeholder={ trans(title) } value={ searchValue } onChange={ (event) => setSearchValue(event.target.value) } />
      <IconButton className={ classes.iconButton } aria-label="Search" onClick={ () => clickHandler(searchValue) }>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
