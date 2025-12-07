import React from "react";
import CustomNodeWrapper from "./CustomNodeWrapper";

const StartNode = ({ data }) => (
  <CustomNodeWrapper data={data} type="startNode" color="#4CAF50">
    <div style={{ fontWeight: "bold" }}>ENTRY POINT</div>
    <div>Metadata: {Object.keys(data.metadata || {}).length} pairs</div>
  </CustomNodeWrapper>
);

export default StartNode;
