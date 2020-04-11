import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import propTypes from "prop-types";

class CoursePage extends React.Component {
  state = {
    course: {
      title: "",
    },
  };

  handlechange = (event) => {
    // Spread operator to copy couse into new const and over write with new title
    const course = { ...this.course, title: event.target.value };
    //Object short hand syntax course:course , can omit right hand is equal to left
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.course);
    this.props.createCourse(this.state.course);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Courses</h2>
          <h3>Courses</h3>
          <input
            type="text"
            onChange={this.handlechange}
            value={this.state.course.title}
          />
          <input type="submit" value="Save" />

          {this.props.courses
            ? this.props.courses.map((course) => (
                <div key={course.title}>{course.title}</div>
              ))
            : ""}
        </form>
      </div>
    );
  }
}

CoursePage.propTypes = {
  createCourse: propTypes.func.isRequired,
  courses: propTypes.array.isRequired,
};

function mapStateToProps(state) {
  console.log(state);
  return {
    courses: state.courses,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCourse: (course) => dispatch(courseActions.createCourse(course)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursePage);
