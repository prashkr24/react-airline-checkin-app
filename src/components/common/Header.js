import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import { NavLink } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'

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
}))

export default function Header() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/dashboard" activeClassName="selected">
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            aria-label="menu"
                        >
                            <HomeIcon />
                        </IconButton>
                    </NavLink>
                    <Typography variant="subtitle2" className={classes.title}>
                        Airline Check-In System
                    </Typography>

                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <NavLink to="/signIn">
                        <Button color="inherit">Logout</Button>
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    )
}
