import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
  loadCheckInPassengers,
  saveCheckInPassenger,
  deleteCheckInPassenger,
} from "../../redux/actions/checkInPassengerAction";
import { loadPassengers } from "../../redux/actions/passengerAction";
import { loadAncillaryServices } from "../../redux/actions/ancillarySeriveAction";
import propTypes from "prop-types";
import { toast } from "react-toastify";

function CheckInPassengerPage({
  checkInPassengers,
  loadCheckInPassengers,
  saveCheckInPassenger,
  deleteCheckInPassenger,
  loadPassengers,
  loadAncillaryServices,
  passengers,
  ancillaryServices,
  ...props
}) {
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
        lookup: { 1: "Shijith", 2: "Sinju", 3: "Tara", 4: "Jeeva" },
      },
      {
        title: "Checked In",
        field: "checkedIn",
        lookup: { 1: "Yes", 2: "No" },
      },
      {
        title: "Ancillary",
        field: "service",
        lookup: {
          1: "Special Meal",
          2: "Shopping Item 1",
          3: "Shopping Item 2",
        },
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
      title="Check-In Passenger"
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
  loadPassengers: propTypes.func.isRequired,
  loadAncillaryServices: propTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    checkInPassengers: state.checkInPassengers,
    passengers: state.passengers,
    ancillaryServices: state.ancillaryServices,
  };
}

const mapDispatchToProps = {
  loadCheckInPassengers,
  saveCheckInPassenger,
  deleteCheckInPassenger,
  loadPassengers,
  loadAncillaryServices,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckInPassengerPage);
