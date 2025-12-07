import React from "react";
import CustomNodeWrapper from "./CustomNodeWrapper";

const TaskNode = ({ data }) => (
  <CustomNodeWrapper data={data} type="taskNode" color="#33A0FF">
    <div> Assignee: {data.assignee || "N/A"}</div>
    <div> Due: {data.dueDate || "N/A"}</div>
  </CustomNodeWrapper>
);

export default TaskNode;
