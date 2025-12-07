import React from "react";
import { Handle, Position } from "@xyflow/react";

const nodeStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  textAlign: "center",
  minWidth: "180px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const CustomNodeWrapper = ({ children, data, type, color = "#33A0FF" }) => {
  const isStart = type === "startNode";
  const isEnd = type === "endNode";

  return (
    <div
      style={{
        ...nodeStyle,
        backgroundColor: color + "20",
        borderColor: color,
      }}
      className={`react-flow__node-${type}`}
    >
      {!isStart && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={true}
          style={{ background: color }}
        />
      )}

      <div>
        <strong style={{ display: "block", marginBottom: "5px", color: color }}>
          {data.title || `${type} Node`}
        </strong>
        <div style={{ fontSize: "12px", color: "#333" }}>{children}</div>
      </div>

      {!isEnd && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={true}
          style={{ background: color }}
        />
      )}
    </div>
  );
};

export default CustomNodeWrapper;
