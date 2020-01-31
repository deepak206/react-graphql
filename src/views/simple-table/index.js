import React, { Fragment, useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { array, string, number, func, shape, arrayOf, bool } from 'prop-types';
import { KeyboardArrowRight, KeyboardArrowLeft, MoreHoriz as MoreHorizIcon } from '@material-ui/icons';
import { withStyles, makeStyles, useTheme, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { trans } from '../../utils';
import LinearProgressBar from '../loader/linear-progress-bar';
import InputField from '../../views/input-field';

import './table.scss';

const theme = createMuiTheme({
  overrides: {
    MuiMenu: {
      paper: {
        boxShadow: "0 1px 2px 0 #eeeff3 !important",
        left: '-60px'
      },
    },
  },
});

const StyledMenu = withStyles({
  paper: {
    borderRadius: '5px',
    minWidth: '130px'
  },
})((props) => (
  <MuiThemeProvider theme={ theme }>
    <Menu
      elevation={ 0 }
      getContentAnchorEl={ null }
      anchorOrigin={ {
        vertical: 'bottom',
        horizontal: 'left',
      } }
      transformOrigin={ {
        vertical: 'top',
        horizontal: 'left',
      } }
      { ...props }
    />
  </MuiThemeProvider>
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    color: theme.palette.common.black,
    '&:focus': {
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.black,
      },
      backgroundColor: theme.palette.primary.white,
    },
    '&:hover': {
      backgroundColor: "#FFE3CB !important",
    },
  },
}))(MenuItem);

const tableStyle = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.secondary,
    flexShrink: 0
  }
}));

const TablePaginationActions = (props) => {
  const classes = tableStyle();
  const theme = useTheme();

  const {
    count, page, rowsPerPage, onChangePage,
  } = props;

  const  [ currentPageNumber, setPageNumber ] = useState(count && page ? page : 1);

  const maxPageNumber = Math.ceil(count / rowsPerPage) ? Math.ceil(count / rowsPerPage) : 0;

  const handleBackButtonClick = (event) => {
    if (currentPageNumber <= 1) {
      event.preventDefault();
    } else {
      setPageNumber(currentPageNumber - 1);
      onChangePage(event, currentPageNumber - 2);
    }
  };

  const handleNextButtonClick = (event) => {
    if (currentPageNumber > (Math.ceil(count / rowsPerPage) - 1)) {
      event.preventDefault();
    } else {
      setPageNumber(currentPageNumber + 1);
      onChangePage(event, currentPageNumber);
    }
  };

  const updatePage = (event) => {
    event.preventDefault();
    onChangePage(event, currentPageNumber ? currentPageNumber - 1 : 1);
    if(!currentPageNumber) {
      setPageNumber(1);
    }
  }

  const updatePageCount =  (event) => {
    let { value } = event.target;

    value = !isNaN(parseInt(value)) ? parseInt(value) : '';

    if (value < 1 || value > maxPageNumber || typeof value !== 'number') {
      setPageNumber('');
      event.preventDefault();
    } else {
      setPageNumber(value);
    }
  }

  return (
    <div className={ `${classes.root} simple-table__table_tfooter_pagination` }>
      <form onSubmit={ updatePage } className="simple-table__table_tfooter_pagination_form">
        <img src={ require('../../assets/images/down-arrow.svg') } alt='back'
          className={ currentPageNumber <= 1 ?"simple-table__table_tfooter_pagination_back-disabled" : "simple-table__table_tfooter_pagination_back" }
          onClick={ currentPageNumber <= 1 ? (event) => event.preventDefault() : handleBackButtonClick }
        />
        <label className="simple-table__table_tfooter_pagination_text">Page</label>
        <input type="text"
          name="page"
          value={ currentPageNumber }
          className="simple-table__table_tfooter_pagination_input"
          onChange={ updatePageCount } autoComplete="off"/> <label className="simple-table__table_tfooter_pagination_text">of {Math.ceil(count / rowsPerPage) && maxPageNumber }</label>
        <img src={ require('../../assets/images/down-arrow.svg') }      alt='next'
          className={ page >= maxPageNumber - 1 ? "simple-table__table_tfooter_pagination_next-disabled" :
            "simple-table__table_tfooter_pagination_next" }
          onClick={ page >= maxPageNumber - 1 ? (event) => event.preventDefault() : handleNextButtonClick }
        />
      </form>
    </div>
  );
};

const SimpleTable = (props) => {

  const { titles, rows, type, totalCount, managePageCount, redordPerPage, handleRowClick, actions, noRecord } = props;

  const [ page, setPage ] = React.useState(0);

  const [ anchorEl, setAnchorEl ] = React.useState(null);

  const [ activeAction, setActiveAction ] = React.useState(null);

  const handleRowActionClick = (event, index) => {
    setActiveAction(index);
    setAnchorEl(event.currentTarget);
  };

  const generateTableRows = (row) => {
    const visibleRows = { ...row };

    if(type === 'institute') {
      delete visibleRows.instituteId;
    }

    if(type === 'learner') {
      delete visibleRows.userId;
    }

    return Object.values(visibleRows).map((cellKey, key) => {

      if (!key) {
        return (
          <TableCell className='simple-table__table_clickable-cell' onClick={ () => handleRowClick(row) } key={ key } component="th" scope="row">
            {cellKey}
          </TableCell>
        );
      }

      return <TableCell align="center" key={ key }>{cellKey}</TableCell>;
    })
  };

  const handelActionMenuClick = (clickAction) =>  {
    setAnchorEl(null);
    clickAction(rows[activeAction]);
  };

  const handleChangePage = (event, newPage) => {
    managePageCount(newPage);
    setPage(newPage);
  };

  const generateRowAction = (index) => {
    return (<td  className="simple-table__table_action">
      <IconButton onClick={ (event) => handleRowActionClick(event, index) }>
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu className='simple-table__table_edit-menu-text'
        id="customized-menu"
        anchorEl={ anchorEl }
        keepMounted
        open={ Boolean(anchorEl) }
        onClose={ () => setAnchorEl(null) }
      >
        {actions.map((action, key) => (
          <StyledMenuItem onClick={ () => handelActionMenuClick(action.event) } key={ key }>
            <ListItemIcon className="simple-table__table_edit-menu-text_style-menu-icon">
              <img src={ require(`../../assets/images/icon-${action.icon}.svg`) } alt=''/>
            </ListItemIcon>
            <ListItemText primary={ trans(action.type) } />
          </StyledMenuItem>))
        }
      </StyledMenu>
    </td>)
  }

  return (
    <Paper className="simple-table">
      <Table className="simple-table__table">
        <TableHead>
          <TableRow>
            {titles.map((title, index) => (
              <TableCell key={ index }>{title}</TableCell>
            ))}
            {!!actions.length && <TableCell/>}
          </TableRow>
        </TableHead>
        {rows.length
          ? (
            <Fragment>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={ index }>
                    {generateTableRows(row)}
                    {!!actions.length && generateRowAction(index)}
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter className="simple-table__table_tfooter">
                <TableRow><TablePagination
                  rowsPerPageOptions={ [] }
                  count={ totalCount }
                  rowsPerPage={ redordPerPage }
                  page={ page }
                  onChangePage={ handleChangePage }
                  ActionsComponent={ TablePaginationActions }
                  labelDisplayedRows={ () => false }
                  className="simple-table__table_tfooter_pagination-container"
                /></TableRow>
              </TableFooter>
            </Fragment>
          ) : (
            <Fragment>
              <TableBody className="simple-table__loading-body">
                <TableRow>
                  <TableCell  colSpan={ titles.length + 1 } className="simple-table__loading-body_common-div">
                    {noRecord ? <LinearProgressBar className="simple-table__loading-body_progress-bar"/> : <div>{ trans('No Record Found') }</div>}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter className="simple-table__table_tfooter">
                {!!noRecord && <TableRow><TablePagination
                  rowsPerPageOptions={ [] }
                  count={ totalCount }
                  rowsPerPage={ redordPerPage }
                  page={ page }
                  onChangePage={ handleChangePage }
                  ActionsComponent={ TablePaginationActions }
                  labelDisplayedRows={ () => false }
                  className="simple-table__table_tfooter_pagination-container"
                /></TableRow>}
              </TableFooter>
            </Fragment>
          )}
      </Table>
    </Paper>
  );
};

SimpleTable.propTypes = {
  totalCount: number,
  managePageCount: func,
  redordPerPage: number,
  handleRowClick: func,
  actions: arrayOf(shape({
    type: string,
    icon: string,
    event: func
  })),
  rows: array.isRequired,
  titles: array.isRequired,
  type: string,
  noRecord: bool,
};

SimpleTable.defaultProps = {
  rows: [],
  titles: [],
  type: 'institute',
  totalCount: 0,
  actions: [],
  noRecord: true,
};

export default SimpleTable;
