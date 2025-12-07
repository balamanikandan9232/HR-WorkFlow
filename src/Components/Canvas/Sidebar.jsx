import React from "react";
import { NODE_TYPES } from "../../utils/constants";

const nodeDefinitions = [
  { type: NODE_TYPES.START, label: "Start Node", color: "#4CAF50" },
  { type: NODE_TYPES.TASK, label: "Task Node", color: "#33A0FF" },
  { type: NODE_TYPES.APPROVAL, label: "Approval Node", color: "#FFC107" },
  {
    type: NODE_TYPES.AUTOMATED_STEP,
    label: "Automated Step",
    color: "#9C27B0",
  },
  { type: NODE_TYPES.END, label: "End Node", color: "#F44336" },
];

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside
      style={{
        width: "200px",
        padding: "15px",
        borderRight: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h4>Drag & Drop Nodes</h4>
      {nodeDefinitions.map((def) => (
        <div
          key={def.type}
          onDragStart={(event) => onDragStart(event, def.type)}
          draggable
          style={{
            padding: "10px",
            margin: "10px 0",
            border: `1px solid ${def.color}`,
            borderRadius: "5px",
            backgroundColor: def.color + "30",
            textAlign: "center",
            cursor: "grab",
            fontWeight: "bold",
          }}
        >
          {def.label}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
