import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import downArrow from '../../assets/images/down-arrow.svg';
import accountIcon from '../../assets/images/header-user.svg';
import logoutIcon from '../../assets/images/icon-logout.svg';
import headerLogo from '../../assets/images/logo.png';
import engFlagIcon from '../../assets/images/english.svg';
import { languageSwitcher } from "../../dispatchers/language-action-dispatcher";
import { connect } from "react-redux";
import { logout } from "../../dispatchers/auth-action-dispatcher";
import CONSTANTS from "../../constants";
import { getLocalStorageData } from "../../utils";

//Not in Nov Release
// import bellIcon from '../../assets/images/header-notification.svg';
// import ptFlagIcon from '../../assets/images/portugues.svg';
// import settingsIcon from '../../assets/images/menu-settings.svg';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 4px 0 #e5e7ee',
    color: '#000',
    height: '60px',
    width: '100%',
    zIndex: '20',
  },
  logo: {
    height: '34px',
    width: '179px',
    marginLeft: '31px'
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sectionDesktop: {
    display: 'flex',
    margin: '20px 0'
  },
  imageIcon: {
    color: '#4e4e4e'
  },
  iconRoot: {
    margin: '0 10px'
  },
  badge: {
    minWidth: '18px',
    height: '18px',
    borderRadius: '2px',
    backgroundColor: '#d90474',
    boxShadow: '0 0 0 2px',
    color: '#FFF',
    fontSize: '11px',
    fontWeight: '700'
  },
  appBarMenu: {
    margin: '0 24px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyItems: 'center',
    cursor: 'pointer'
  },
  appBarMenuTitle: {
    fontSize: '14px',
    margin: '10px',
    fontWeight: '600',
    color: '#4e4e4e'
  },
  appBarMenuIcon: {
    color: '#4e4e4e'
  },
  appBarMenuItem: {
    "&:hover": {
      backgroundColor: 'rgba(234, 118, 0, 0.2)'
    }
  },
  langMenuTitle: {
    fontSize: '14px',
    color: '#4e4e4e',
    marginLeft: '14px'
  }
}));

const StyledMenu = withStyles({
  paper: {
    borderRadius: '5px',
    boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12);',
    minWidth: '170px'
  },
})((props) => (
  <Menu
    elevation={ 0 }
    getContentAnchorEl={ null }
    anchorOrigin={ {
      vertical: 'bottom',
      horizontal: 'center',
    } }
    transformOrigin={ {
      vertical: 'top',
      horizontal: 'center',
    } }
    { ...props }
  />
));

const Header = (props) => {
  const classes = useStyles();
  //Initial States for the anchor for language menu and account menu
  const [ anchorEl, setAnchorEl ] = React.useState(null);
  const [ langAnchorEl, setlangAnchorEl ] = React.useState(null);
  const { language, isAuth } = props;
  const isMenuOpen = Boolean(anchorEl);
  const isLangMenuOpen = Boolean(langAnchorEl);
  const userData = getLocalStorageData('userData');
  const menuId = 'primary-search-account-menu';
  const langMenuId = `primary-search-lang-menu`;

  // The lang will come from product model configuration.
  // const languages = [ { key: 'en', label: 'English', icon: engFlagIcon }, {
  //   key: 'pt',
  //   label: 'Portuguese',
  //   icon: ptFlagIcon
  // } ];
  const languages = [ { key: 'en', label: 'English', icon: engFlagIcon } ];
  /**
   * Opens the account/profile menu
   */
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Opens the language menu
   */
  const handleLanguageMenuOpen = (event) => {
    setlangAnchorEl(event.currentTarget);
  };

  /**
   * Closes any open menu. In our case, only one of the menus will be opened, so closing both here
   * will not have any side-effect(s)
   */
  const handleMenuClose = () => {
    setAnchorEl(null);
    setlangAnchorEl(null);
  };

  /**
   * Trigger a dispatch to change language
   * @param lng: selected language key [en || pt]
   */
  const onLanguageChange = (lng) => {
    props.changeLanguage(lng);
    setlangAnchorEl(null);
  };

  /**
   *  Account settings *might* be different for user roles, hence using as a configuration.
   *  label: String to be displayed
   *  icon: Icon to be displayed next to the string
   *  action: Action to be performed when clicking the item.
   */
  const accountSettings = [
    // { label: 'Settings', icon: settingsIcon, action: handleMenuClose },
    { label: 'Logout', icon: logoutIcon, action: props.logout } ];

  /**
   * Render the account/profile menu
   */
  const renderAccountMenu = (
    <StyledMenu
      anchorEl={ anchorEl }
      id={ menuId }
      keepMounted
      open={ isMenuOpen }
      onClose={ handleMenuClose }>
      {accountSettings.map((item) => (
        <MenuItem key={ item.label } onClick={ item.action } className={ classes.appBarMenuItem }>
          <img alt={ item.label } className={ classes.imageIcon } src={ item.icon }/>
          <span className={ classes.langMenuTitle }>{item.label}</span>
        </MenuItem>
      ))}
    </StyledMenu>
  );

  /**
   * Render the language menu
   */
  const renderLanguageMenu = (
    <StyledMenu
      anchorEl={ langAnchorEl }
      id={ menuId }
      keepMounted
      open={ isLangMenuOpen }
      onClose={ handleMenuClose }>
      {languages.map((lang) => (
        <MenuItem key={ lang.key } onClick={ () => onLanguageChange(lang.key) } className={ classes.appBarMenuItem }>
          <img alt={ lang.label } className={ classes.imageIcon } src={ lang.icon }/>
          <span className={ classes.langMenuTitle }>{lang.label}</span>
        </MenuItem>
      ))}
    </StyledMenu>
  );

  return (
    <div>
      <AppBar position="fixed" className={ classes.appBar }>
        <Toolbar>
          <div>
            <img alt="MePro Logo" className={ classes.logo } src={ headerLogo }/>
          </div>
          <div className={ classes.grow }/>
          <div className={ classes.sectionDesktop }>
            {getLocalStorageData('userData') && getLocalStorageData('userData').primaryRole &&getLocalStorageData('userData').primaryRole ==="LEARNER" &&
            <div className={ classes.appBarMenu }
              aria-label="language setting of current user"
              aria-controls={ langMenuId }
              aria-haspopup="true"
              onClick={ handleLanguageMenuOpen }>
              <span className={ classes.appBarMenuTitle }>{CONSTANTS.LANGUAGES[language]}</span>
              <img alt="Show language dropdown" className={ classes.imageIcon } src={ downArrow }/>
            </div>}
            {/*We display the notifications for authenticated users only*/}
            {/* {isAuth ?
              <IconButton classes={ { root: classes.iconRoot } } aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={ 4 } classes={ { badge: classes.badge } }>
                  <img alt="Notifications icon" className={ classes.imageIcon } src={ bellIcon }/>
                </Badge>
              </IconButton>
              : null} */}
            {/*We display the account menu for authenticated users only*/}
            {isAuth ?
              <div className={ classes.appBarMenu }
                aria-label="account of current user"
                aria-controls={ menuId }
                aria-haspopup="true"
                onClick={ handleProfileMenuOpen }>
                <img alt="Account icon" className={ classes.imageIcon } src={ accountIcon }/>
                <span className={ classes.appBarMenuTitle }>{userData.firstName} {userData.lastName}</span>
                <img alt="Show account dropdown" className={ classes.imageIcon } src={ downArrow }/>
              </div> : null}
          </div>
        </Toolbar>
      </AppBar>
      {renderAccountMenu}
      {renderLanguageMenu}
    </div>
  );
};

const mapStateToProps = ({ languageState: { language } }) => ({ language });

const mapDispatchToProps = (dispatch) => ({
  changeLanguage: (event) => {
    dispatch(languageSwitcher({ langKey: event }));
  },
  logout: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
