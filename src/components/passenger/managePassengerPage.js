import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
  loadPassengers,
  savePassenger,
  deletePassenger,
} from "../../redux/actions/passengerAction";
import propTypes from "prop-types";
import { toast } from "react-toastify";

function ManagePassengerPage({
  passengers,
  loadPassengers,
  savePassenger,
  deletePassenger,
  ...props
}) {
  console.log("passengers list", passengers);
  const [state, setState] = useState({
    columns: [
      { title: "Name", field: "name" },
      { title: "Passport Details", field: "passport" },
      { title: "Address", field: "address" },
    ],
  });

  useEffect(() => {
    if (passengers.length === 0) {
      loadPassengers().catch((error) => {
        console.log("Loading passengers failed" + error);
      });
    }
  });

  function handleSave(passenger) {
    savePassenger(passenger)
      .then(() => {})
      .catch((error) => {});
  }

  async function handleDeletePassenger(passenger) {
    console.log("Delete Passenger", passenger);
    try {
      await deletePassenger(passenger);
    } catch (error) {}
  }

  return (
    <MaterialTable
      title="Manage Passenger"
      columns={state.columns}
      data={passengers}
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
            handleDeletePassenger(oldData);
          }),
      }}
    />
  );
}

ManagePassengerPage.propTypes = {
  passengers: propTypes.array.isRequired,
  loadPassengers: propTypes.func.isRequired,
  savePassenger: propTypes.func.isRequired,
  deletePassenger: propTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    passengers: state.passengers,
  };
}

const mapDispatchToProps = {
  loadPassengers,
  savePassenger,
  deletePassenger,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePassengerPage);
