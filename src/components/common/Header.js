// import React from "react";
// import { NavLink } from "react-router-dom";

// const Header = () => {
//   const activeStyle = { color: "#F15B2A" };
//   return (
//     <>
//       <meta
//         name="viewport"
//         content="minimum-scale=1, initial-scale=1, width=device-width"
//       />
//       <nav>
//         <NavLink exact to="/" activeStyle={activeStyle}>
//           Home
//         </NavLink>
//         {" | "}
//         <NavLink to="/about" activeStyle={activeStyle}>
//           About
//         </NavLink>
//         {" | "}
//         <NavLink to="/courses" activeStyle={activeStyle}>
//           Courses
//         </NavLink>
//         {" | "}
//         <NavLink to="/course" activeStyle={activeStyle}>
//           Manage Course
//         </NavLink>
//       </nav>
//     </>
//   );
// };

// export default Header;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Airline Check-In System
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
