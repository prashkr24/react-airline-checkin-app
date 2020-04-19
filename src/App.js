import React from "react";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import CoursesPage from "./components/courses/CoursesPage";
import ManageCoursePage from "./components/courses/ManageCoursePage";
import Header from "./components/common/Header";
import ManagePassengerPage from "./components/passenger/managePassengerPage";
import AncillaryServicePage from "./components/passenger/ancillaryServicePage";
import PageNotFound from "./components/PageNotFound";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DashboardPage from "./components/dashboard/dashboardPage";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import CheckInPage from "./components/passenger/checkInPage";
import InFlightPage from "./components/passenger/inflightpage";
import SignInPage from "./components/login/signInPage";

const App = () => (
  <>
    <CssBaseline />
    <Header />
    <Container
      style={{ backgroundColor: "#cfe8fc", height: "90vh", paddingTop: "10px" }}
    >
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />

        <Route path="/dashboard" component={DashboardPage} />
        <Route path="/passenger" component={ManagePassengerPage} />
        <Route path="/ancillary" component={AncillaryServicePage} />
        <Route path="/checkin" component={CheckInPage} />
        <Route path="/inflight" component={InFlightPage} />
        <Route path="/signin" component={SignInPage} />

        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </Container>
  </>
);

export default App;
