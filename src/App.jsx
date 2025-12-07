import React, { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  useReactFlow,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WorkflowProvider, useWorkflow } from "./context/WorkflowContext";
import Sidebar from "./Components/Canvas/Sidebar";
import NodeConfigPanel from "./Components/ConfigForms/NodeConfigPanel";
import WorkflowSandbox from "./Components/Sandbox/WorkflowSandbox";

import * as CustomNodes from "./Components/CustomNodes/index";

const nodeTypes = {
  startNode: CustomNodes.StartNode,
  taskNode: CustomNodes.TaskNode,
  approvalNode: CustomNodes.ApprovalNode,
  automatedStepNode: CustomNodes.AutomatedStepNode,
  endNode: CustomNodes.EndNode,
};

const FlowWrapper = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onNodesDelete,
    addNode,
  } = useWorkflow();
  const reactFlowInstance = useReactFlow();

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      addNode(type, position);
    },
    [reactFlowInstance, addNode]
  );

  return (
    <div style={{ flexGrow: 1, position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesDelete={onNodesDelete}
        nodeTypes={nodeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

const App = () => (
  <ReactFlowProvider>
    <WorkflowProvider>
      <div
        style={{ height: "100vh", display: "flex", flexDirection: "column" }}
      >
        <header
          style={{
            padding: "10px 20px",
            borderBottom: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f0f0f0",
          }}
        >
          <h2 style={{ width: "100%", textAlign: "center" }}>
            HR WorkFlow Designer
          </h2>
        </header>
        <div style={{ display: "flex", flexGrow: 1, minHeight: "0" }}>
          <Sidebar />
          <FlowWrapper />
          <NodeConfigPanel />
        </div>
        <WorkflowSandbox />
      </div>
    </WorkflowProvider>
  </ReactFlowProvider>
);

export default App;
