import React from 'react'
import Header from './components/common/Header'
import ManagePassengerPage from './components/passenger/managePassengerPage'
import AncillaryServicePage from './components/passenger/ancillaryServicePage'
import PageNotFound from './components/PageNotFound'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import DashboardPage from './components/dashboard/dashboardPage'
import CssBaseline from '@material-ui/core/CssBaseline'
import Container from '@material-ui/core/Container'
import CheckInPassengerPage from './components/passenger/checkInPassengerPage'
import InFlightPage from './components/passenger/inflightpage'
import SignInPage from './components/login/signInPage'

const App = () => (
    <React.Fragment>
        <CssBaseline />
        <Header />
        <Container
            style={{
                backgroundColor: '#cfe8fc',
                minHeight: '100vh',
                height: '100%',
                paddingTop: '10px',
            }}
        >
            <Switch>
                <Route exact path="/" component={DashboardPage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/passenger" component={ManagePassengerPage} />
                <Route path="/ancillary" component={AncillaryServicePage} />
                <Route path="/checkin" component={CheckInPassengerPage} />
                <Route path="/inflight" component={InFlightPage} />
                <Route path="/signin" component={SignInPage} />

                <Route component={PageNotFound} />
            </Switch>
            <ToastContainer autoClose={3000} hideProgressBar />
        </Container>
    </React.Fragment>
)

export default App
