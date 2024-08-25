import React, { useState } from 'react'; 
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SearchIcon from '@mui/icons-material/Search';
import "./style.css";
import 'bootstrap/dist/css/bootstrap.css';
import './responsive.css';  // Ensure this import for responsive styles

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function AppNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useRecoilState("");
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }} id="appNavBar">
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{
          backgroundColor: "#101460",
          height: "60px",
          width: "100%",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawerOpen()}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onMouseOver={() => (document.body.style.cursor = "pointer")}
            onClick={() => navigate("/")}
          >
            Target
          </Typography>
          <div className="input-group" style={{ maxWidth: '300px', width: '100%' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for Lectures"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                backgroundColor: 'white',
                borderRadius: '24px 0 0 24px',
              }}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => navigate(`/search/${query}`)}
              style={{
                backgroundColor: '#000000',
                borderRadius: '0 24px 24px 0',
              }}
            >
              <SearchIcon />
            </button>
          </div>
          {(
          //   <Button
          //     color="inherit"
          //     onClick = {async () => {
          //       try {
          //           setIsLoading(true);
          //           const response = await axios.post(
          //             "http://localhost:8000/logout_api",
          //             {
          //               username: localStorage.getItem("email"),
          //             }
          //           );
          //           localStorage.removeItem("token");
          //           localStorage.removeItem("isLoggedIn");
          //           localStorage.removeItem("email");
          //           toast.success(response.data.message);
          //           setIsLoading(false);
          //           navigate("/");
          //         } catch (err) {
          //           console.error(err);
          //           setMessage(err.response?.data?.message || "Logout failed. Please try again.");
          //           setIsLoading(false);
          //         }
          //     }}
          //   >
          //     Logout
          //   </Button>
          // ) : (
            <div>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {<List>
            {/* add user name and email */}
            <ListItem key='name' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={"admin?.username"} secondary={'admin?.email'} />
              </ListItemButton>
            </ListItem>
          </List>}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose();
                navigate("/courses");
              }}
            >
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary={"All Courses"} />
            </ListItemButton>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                handleDrawerClose();
                navigate("/createCourse");
              }}
            >
              <ListItemIcon>
                <ShoppingBasketIcon />
              </ListItemIcon>
              <ListItemText primary={"Create Courses"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export { Main };
export default AppNavBar;
