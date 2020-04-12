import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import propTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";

class CoursePage extends React.Component {
  componentDidMount() {
    const { courses, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        console.log("Loading courses failed" + error);
      });
    }
  }
  render() {
    return (
      <>
        <h2>Courses</h2>
        {<CourseList courses={this.props.courses} />}
      </>
    );
  }
}

CoursePage.propTypes = {
  courses: propTypes.array.isRequired,
  actions: propTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
