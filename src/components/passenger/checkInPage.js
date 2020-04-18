import React from "react";
import MaterialTable from "material-table";

export default function CheckInPage() {
  const [state, setState] = React.useState({
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
    data: [],
  });

  return (
    <MaterialTable
      title="Flight Check-in"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}
