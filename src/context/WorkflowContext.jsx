import React, { createContext, useContext, useState, useCallback } from "react";
import {
  useNodesState,
  useEdgesState,
  addEdge,
  getConnectedEdges,
} from "@xyflow/react";
import {
  initialNodes,
  initialEdges,
  getInitialNodeData,
} from "../utils/constants";

const WorkflowContext = createContext();

export const useWorkflow = () => useContext(WorkflowContext);

let nextNodeId = initialNodes.length + 1;

export const WorkflowProvider = ({ children }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const updateNodeData = useCallback(
    (id, data) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...data } } : node
        )
      );
    },
    [setNodes]
  );

  const onNodesChangeWithSelection = useCallback(
    (changes) => {
      onNodesChange(changes);
      changes.forEach((change) => {
        if (change.type === "select") {
          const node = nodes.find((n) => n.id === change.id);
          setSelectedNode(change.selected ? node : null);
        }
      });
    },
    [onNodesChange, nodes]
  );

  const addNode = useCallback(
    (type, position) => {
      const newNode = {
        id: `node_${nextNodeId++}`,
        type: type,
        position,
        data: {
          title: `${type.replace(/Node/i, "")} Step`,
          ...getInitialNodeData(type),
        },
        
        sourcePosition: type === "endNode" ? null : "bottom",
        targetPosition: type === "startNode" ? null : "top",
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const onNodesDelete = useCallback(
    (nodesToDelete) => {
      if (nodesToDelete.some((n) => n.id === selectedNode?.id)) {
        setSelectedNode(null);
      }
      setNodes((nds) =>
        nds.filter((node) => !nodesToDelete.some((n) => n.id === node.id))
      );

    
      setEdges((eds) => {
        const connectedEdges = getConnectedEdges(nodesToDelete, eds);
        const edgeIdsToDelete = new Set(connectedEdges.map((e) => e.id));
        return eds.filter((edge) => !edgeIdsToDelete.has(edge.id));
      });
    },
    [selectedNode, setNodes, setEdges]
  );

  const value = {
    nodes,
    edges,
    selectedNode,
    onNodesChange: onNodesChangeWithSelection,
    onEdgesChange,
    onConnect,
    onNodesDelete,
    updateNodeData,
    addNode,
  };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
};
