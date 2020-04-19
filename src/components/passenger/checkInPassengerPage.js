import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
  loadCheckInPassengers,
  saveCheckInPassenger,
  deleteCheckInPassenger,
} from "../../redux/actions/checkInPassengerAction";
import propTypes from "prop-types";
import { toast } from "react-toastify";

function CheckInPassengerPage({
  checkInPassengers,
  loadCheckInPassengers,
  saveCheckInPassenger,
  deleteCheckInPassenger,
  ...props
}) {
  console.log("checkInPassengers list", checkInPassengers);
  const [state, setState] = useState({
    columns: [
      {
        title: "Flight",
        field: "flight",
        lookup: { 1: "Flight 1", 2: "Flight 2", 3: "Flight 3" },
      },
      {
        title: "Passenger",
        field: "passenger",
        lookup: { 1: "Passenger 1", 2: "Passenger 2", 3: "Passenger 3" },
      },
      {
        title: "Checked In",
        field: "checkedIn",
        lookup: { 1: "Yes", 2: "No" },
      },
      {
        title: "Ancillary",
        field: "ancillary",
        lookup: { 1: "Wheel chair", 2: "Infants" },
      },
      {
        title: "Seat No",
        field: "seatno",
      },
    ],
  });

  useEffect(() => {
    if (checkInPassengers.length === 0) {
      loadCheckInPassengers().catch((error) => {
        console.log("Loading checkInPassengers failed" + error);
      });
    }
  });

  function handleSave(checkInPassenger) {
    saveCheckInPassenger(checkInPassenger)
      .then(() => {})
      .catch((error) => {});
  }

  async function handleDeleteCheckInPassenger(checkInPassenger) {
    console.log("Delete CheckInPassenger", checkInPassenger);
    try {
      await deleteCheckInPassenger(checkInPassenger);
    } catch (error) {}
  }

  return (
    <MaterialTable
      title="Manage CheckInPassenger"
      columns={state.columns}
      data={checkInPassengers}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            handleSave({ ...newData, id: null });
            resolve();
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            resolve();
            handleSave(newData);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            resolve();
            handleDeleteCheckInPassenger(oldData);
          }),
      }}
    />
  );
}

CheckInPassengerPage.propTypes = {
  checkInPassengers: propTypes.array.isRequired,
  loadCheckInPassengers: propTypes.func.isRequired,
  saveCheckInPassenger: propTypes.func.isRequired,
  deleteCheckInPassenger: propTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    checkInPassengers: state.checkInPassengers,
  };
}

const mapDispatchToProps = {
  loadCheckInPassengers,
  saveCheckInPassenger,
  deleteCheckInPassenger,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckInPassengerPage);
