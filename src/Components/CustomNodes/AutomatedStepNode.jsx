import React from "react";
import CustomNodeWrapper from "./CustomNodeWrapper";

const AutomatedStepNode = ({ data }) => (
  <CustomNodeWrapper data={data} type="automatedStepNode" color="#9C27B0">
    <div> Action: {data.actionLabel || "Select Action"}</div>
    <div>Parameters: {Object.keys(data.actionParams || {}).length} set</div>
  </CustomNodeWrapper>
);

export default AutomatedStepNode;
