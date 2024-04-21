import React from "react";

const Index = () => {
  // ... existing Index component code, ensure to include collapseDataTable function within

function collapseDataTable(data) {
    const newDataTable = [];
    const groupedData = {};

    data.forEach((row) => {
      const key = `${row["CartKey"]}_${row["Location"]}`;
      if (!groupedData[key]) {
        groupedData[key] = { ...row, distinctRows: [row] };
      } else {
        const existing = groupedData[key].distinctRows.find(r => r["Qty"] === row["Qty"]);
        if (existing) {
          // Combine rows with the same 'Qty'
          existing.combinedRows = (existing.combinedRows || 1) + 1;
        } else {
          // Keep distinct 'Qty' values separate
          groupedData[key].distinctRows.push(row);
        }
      }
    });

    // Flatten the grouped data into newDataTable
    Object.values(groupedData).forEach(group => {
      if (group.distinctRows.length > 1) {
        group.distinctRows.forEach(row => newDataTable.push(row));
      } else {
        newDataTable.push(group.distinctRows[0]);
      }
    });

    // Sort by CartKey and Location for consistent ordering
    newDataTable.sort((a, b) => {
      const cartKeyComparison = a["CartKey"].localeCompare(b["CartKey"]);
      if (cartKeyComparison !== 0) return cartKeyComparison;
      return a["Location"].localeCompare(b["Location"]);
    });

    return newDataTable;
  }

  return <div>{/* The rest of your component's rendering logic will go here */}</div>;
};

export default Index;
