import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useAuth, useFirestore, useFirestoreDocData, useUser } from "reactfire"; // Importamos useUser para obtener la info del usuarios
import { signOut } from "firebase/auth"; // Importamos la función signOut de Firebase
import { Link, useNavigate } from "react-router-dom"; // Para la redirección
import { doc } from "firebase/firestore";

const paths = [
  {
    displayName: "Command",
    key: "command",
    path: `/`,
    // Icon: <Home />,
  },
  // {
  //   displayName: "Ajustes",
  //   key: "setting",
  //   path: `/apps/vwsg/setting`,
  //   Icon: <SettingsIcon />,
  // },
  {
    displayName: "Menu",
    key: "menu",
    path: `/menu`,
    // Icon: <Home />,
  },
];

export let userRef: string;

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const auth = useAuth(); // Obtenemos la instancia de autenticación de Firebase
  const navigate = useNavigate(); // Hook para redirigir
  const { data: user } = useUser(); // Obtenemos la data del usuario
  const firestore = useFirestore();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
    }
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ComandApp
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {paths.map((menuElement) => (
              <Button
                key={menuElement.key}
                component={Link}
                to={menuElement.path}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {menuElement.displayName}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={user?.displayName || "User"}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.displayName || "user"}
                  src={user?.photoURL || ""}
                />{" "}
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
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={
                    setting === "Logout" ? handleLogout : handleCloseUserMenu
                  }
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
