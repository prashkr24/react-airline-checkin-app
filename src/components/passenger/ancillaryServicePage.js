import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { connect } from "react-redux";
import {
  loadAncillaryServices,
  saveAncillaryService,
  deleteAncillaryService,
} from "../../redux/actions/ancillarySeriveAction";
import propTypes from "prop-types";
import { toast } from "react-toastify";

function ManageAncillaryServicePage({
  ancillaryServices,
  loadAncillaryServices,
  saveAncillaryService,
  deleteAncillaryService,
  ...props
}) {
  console.log("ancillaryServices list", ancillaryServices);
  const [state, setState] = useState({
    columns: [
      {
        title: "Flight",
        field: "flight",
        lookup: { 1: "Flight 1", 2: "Flight 2", 3: "Flight 3" },
      },
      {
        title: "Service",
        field: "service",
        lookup: { 1: "Special Meal", 2: "Shopping Item 1", 3: "Shopping Item 2" },
      },
    ],
  });

  useEffect(() => {
    if (ancillaryServices.length === 0) {
      loadAncillaryServices().catch((error) => {
        console.log("Loading courses failed" + error);
      });
    }
  });

  function handleSave(ancillaryService) {
    saveAncillaryService(ancillaryService)
      .then(() => {})
      .catch((error) => {});
  }

  async function handleDeleteAncillaryService(ancillaryService) {
    console.log("Delete AncillaryService", ancillaryService);
    try {
      await deleteAncillaryService(ancillaryService);
    } catch (error) {}
  }

  return (
    <MaterialTable
      title="Manage AncillaryService"
      columns={state.columns}
      data={ancillaryServices}
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
            handleDeleteAncillaryService(oldData);
          }),
      }}
    />
  );
}

ManageAncillaryServicePage.propTypes = {
  courses: propTypes.array.isRequired,
  loadAncillaryServices: propTypes.func.isRequired,
  saveAncillaryService: propTypes.func.isRequired,
  deleteAncillaryService: propTypes.func.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    ancillaryServices: state.ancillaryServices,
  };
}

const mapDispatchToProps = {
  loadAncillaryServices,
  saveAncillaryService,
  deleteAncillaryService,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAncillaryServicePage);
