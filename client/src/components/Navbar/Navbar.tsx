import * as React from "react";
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
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Link } from "react-router-dom";
import { ProfileDrawer } from "./ProfileDrawer/ProfileDrawer";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const { user, setUser, setToken } = useGlobalContext();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { pathname } = useLocation();
  const [curLocation, setCurLocation] = React.useState<string>("");

  React.useEffect(() => {
    setCurLocation(pathname.replace("/crypto-exchange/", ""));
  }, [pathname]);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    handleCloseUserMenu();
    window.location.reload();
  };

  return (
    <AppBar
      position="sticky"
      className="Navbar"
      sx={{ height: "60px !important", backgroundColor: "black" }}
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
              {curLocation === "home" ? null : (
                <Link to="/crypto-exchange/home">
                  <MenuItem onClick={handleCloseUserMenu}>
                    Browse Cryptos
                  </MenuItem>
                </Link>
              )}

              {user ? (
                <MenuItem onClick={handleCloseUserMenu} sx={{ padding: 0 }}>
                  <ProfileDrawer />
                </MenuItem>
              ) : null}

              {curLocation === "" ? null : (
                <Link to="/crypto-exchange/">
                  <MenuItem onClick={handleCloseUserMenu}>About</MenuItem>
                </Link>
              )}

              {/* Buttons based on current log in status */}
              {curLocation === "login" ? null : user ? (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              ) : (
                <Link to="/crypto-exchange/login">
                  <MenuItem onClick={handleCloseUserMenu}>Log In</MenuItem>
                </Link>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};