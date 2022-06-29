import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material/";
import { useGlobalContext } from "../../context/GlobalCryptoContext";
import { Link } from "react-router-dom";
import { ProfileDrawer } from "./ProfileDrawer/ProfileDrawer";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useTheme } from "@mui/material/styles";

const style = {
  justifyContent: "center",
};

export const Navbar = () => {
  const { user, setUser, setToken } = useGlobalContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const setTheme = useThemeContext();
  const theme = useTheme();

  // Will manage which navigation options to show user based on current page.
  const { pathname } = useLocation();
  const [curLocation, setCurLocation] = useState<string>("");

  useEffect(() => {
    setCurLocation(pathname.replace("/crypto-exchange/", ""));
  }, [pathname]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleTheme = () => {
    setTheme.toggleSiteTheme();
    handleCloseUserMenu();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    handleCloseUserMenu();
    window.location.reload();
  };

  return (
    <AppBar
      position="sticky"
      className="Navbar"
      sx={{ height: "60px !important", backgroundColor: "rgb(0,0,0)" }}
    >
      <Container maxWidth="xl" className="navbarContainer">
        <Toolbar disableGutters>
          <Link to="crypto-exchange/" className="logoContainer">
            <img src={logo} alt="logo" className="logoImg" />
            <Typography className="title">CryptoExchange</Typography>
          </Link>

          {/* Profile Icon with sub-menu */}
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar
                  alt={user?.username}
                  src={user?.profilePicture}
                  className="userAvatar"
                  sx={{
                    width: "35px",
                    height: "35px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* Dynamically Rendered Navbar Options */}
              {curLocation === "home" ? null : (
                <Link to="/crypto-exchange/home">
                  <MenuItem onClick={handleCloseUserMenu} sx={style}>
                    Browse Cryptos
                  </MenuItem>
                </Link>
              )}

              {user && (
                <MenuItem onClick={handleCloseUserMenu} sx={style}>
                  <ProfileDrawer />
                </MenuItem>
              )}

              {curLocation === "" ? null : (
                <Link to="/crypto-exchange/">
                  <MenuItem onClick={handleCloseUserMenu} sx={style}>
                    About
                  </MenuItem>
                </Link>
              )}

              {/* Buttons based on current log in status */}
              {curLocation === "login" ? null : user ? (
                <MenuItem onClick={handleLogout} sx={style}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              ) : (
                <Link to="/crypto-exchange/login">
                  <MenuItem onClick={handleCloseUserMenu} sx={style}>
                    Log In
                  </MenuItem>
                </Link>
              )}

              {/* Theme Toggle */}
              <MenuItem onClick={toggleTheme} sx={style}>
                <IconButton sx={{ ml: 1 }} color="inherit">
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
