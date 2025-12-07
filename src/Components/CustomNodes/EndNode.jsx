import React from "react";
import CustomNodeWrapper from "./CustomNodeWrapper";

const EndNode = ({ data }) => (
  <CustomNodeWrapper data={data} type="endNode" color="#F44336">
    <div style={{ fontWeight: "bold" }}>END WORKFLOW</div>
    <div
      style={{
        fontSize: "10px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {data.endMessage || "Completion..."}
    </div>
  </CustomNodeWrapper>
);

export default EndNode;
