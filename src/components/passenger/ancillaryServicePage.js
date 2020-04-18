import React from "react";
import MaterialTable from "material-table";

export default function AncillaryServicePage() {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Flight",
        field: "flight",
        lookup: { 1: "Flight 1", 2: "Flight 2", 3: "Flight 3" },
      },
      {
        meals: "Special Meals",
        field: "meals",
        lookup: { 1: "Meal 1", 2: "Meal 2", 3: "Meal 3" },
      },
      {
        items: "Shopping Items",
        field: "items",
        lookup: { 1: "Item 1", 2: "Item 2", 3: "Item 3" },
      },
    ],
    data: [{ title: "Shijith", meals: "1", items: "1" }],
  });

  return (
    <MaterialTable
      title="Ancillary services per flight"
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
