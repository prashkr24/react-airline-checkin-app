import React, { useEffect } from "react";
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

function InFlightPage({
  checkInPassengers,
  loadCheckInPassengers,
  saveCheckInPassenger,
  deleteCheckInPassenger,
  loadAncillaryServices,
  loadPassengers,
  passengers,
  ancillaryServices,
  ...props
}) {
  let ancillaryServiceLookUp = {};
  let passengersLookUp = {};

  if (passengers.length > 0) {
    passengers.map((passengers) => {
      passengersLookUp[passengers.id] = passengers.name;
    });
  }
  if (ancillaryServices.length > 0) {
    ancillaryServices.map((ancillaryService) => {
      ancillaryServiceLookUp[ancillaryService.id] = ancillaryService.service;
    });
  }
  let columns = [
    {
      title: "Flight",
      field: "flight",
      lookup: { 1: "Flight 1", 2: "Flight 2", 3: "Flight 3" },
    },
    {
      title: "Passenger",
      field: "passenger",
      lookup: passengersLookUp,
    },
    {
      title: "Checked In",
      field: "checkedIn",
      lookup: { 1: "Yes", 2: "No" },
    },
    {
      title: "Ancillary",
      field: "service",
      lookup: ancillaryServiceLookUp,
    },
    {
      title: "Seat No",
      field: "seatno",
    },
  ];

  useEffect(() => {
    loadAsyncData();
  }, []);

  async function loadAsyncData() {
    try {
      await loadPassengers();
      await loadAncillaryServices();
      await loadCheckInPassengers();
    } catch (error) {
      console.log("Loading checkInPassengers failed" + error);
    }
  }

  function handleSave(checkInPassenger) {
    saveCheckInPassenger(checkInPassenger)
      .then(() => {})
      .catch((error) => {});
  }

  async function handleDeleteCheckInPassenger(checkInPassenger) {
    try {
      await deleteCheckInPassenger(checkInPassenger);
    } catch (error) {}
  }

  return (
    <MaterialTable
      title="In Flight"
      columns={columns}
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

InFlightPage.propTypes = {
  checkInPassengers: propTypes.array.isRequired,
  passengers: propTypes.array.isRequired,
  ancillaryServices: propTypes.array.isRequired,
  loadCheckInPassengers: propTypes.func.isRequired,
  saveCheckInPassenger: propTypes.func.isRequired,
  deleteCheckInPassenger: propTypes.func.isRequired,
  loadAncillaryServices: propTypes.func.isRequired,
  loadPassengers: propTypes.func.isRequired,
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
  loadAncillaryServices,
  loadPassengers,
};

export default connect(mapStateToProps, mapDispatchToProps)(InFlightPage);
