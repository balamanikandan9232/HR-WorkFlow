import React from "react";
import { useWorkflow } from "../../context/WorkflowContext";

import StartNodeForm from "./StartNodeForm";
import TaskNodeForm from "./TaskNodeForm";
import ApprovalNodeForm from "./ApprovalNodeForm";
import AutomatedStepNodeForm from "./AutomatedStepNodeForm";
import EndNodeForm from "./EndNodeForm";

const formMap = {
  startNode: StartNodeForm,
  taskNode: TaskNodeForm,
  approvalNode: ApprovalNodeForm,
  automatedStepNode: AutomatedStepNodeForm,
  endNode: EndNodeForm,
};

const NodeConfigPanel = () => {
  const { selectedNode, updateNodeData, onNodesDelete } = useWorkflow();

  if (!selectedNode) {
    return (
      <div
        style={{
          padding: "20px",
          borderLeft: "1px solid #ccc",
          minWidth: "350px",
        }}
      >
        <h3>Node Configuration</h3>
        <p style={{ color: "#666" }}>
          Select a node on the canvas to configure its properties.
        </p>
      </div>
    );
  }

  const FormComponent = formMap[selectedNode.type];
  const nodeTypeLabel = selectedNode.type
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace("Node", " Step")
    .toUpperCase();

  const handleDataChange = (newData) => {
    updateNodeData(selectedNode.id, newData);
  };

  const handleDelete = () => {
    onNodesDelete([selectedNode]);
  };

  return (
    <div
      style={{
        padding: "20px",
        borderLeft: "1px solid #ccc",
        minWidth: "350px",
        backgroundColor: "#f7f7f7",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{nodeTypeLabel}</h3>
        {selectedNode.type !== "startNode" && (
          <button
            onClick={handleDelete}
            style={{
              background: "#dc3545",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        )}
      </div>

      <p style={{ color: "#999", fontSize: "0.8em" }}>ID: {selectedNode.id}</p>
      <hr style={{ marginBottom: "20px" }} />

      {FormComponent ? (
        <FormComponent
          key={selectedNode.id}
          nodeData={selectedNode.data}
          onDataChange={handleDataChange}
        />
      ) : (
        <div>No configuration form found for type: {selectedNode.type}</div>
      )}
    </div>
  );
};

export default NodeConfigPanel;
