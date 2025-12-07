import React from "react";
import CustomNodeWrapper from "./CustomNodeWrapper";

const ApprovalNode = ({ data }) => (
  <CustomNodeWrapper data={data} type="approvalNode" color="#FFC107">
    <div>Role: {data.approverRole || "Manager"}</div>
    <div>Threshold: {data.autoApproveThreshold || 0}%</div>
  </CustomNodeWrapper>
);

export default ApprovalNode;
