export const NODE_TYPES = {
  START: "startNode",
  TASK: "taskNode",
  APPROVAL: "approvalNode",
  AUTOMATED_STEP: "automatedStepNode",
  END: "endNode",
};

export const initialNodes = [
  {
    id: "node_1",
    type: NODE_TYPES.START,
    data: {
      title: "Workflow Start: Request",
      metadata: { department: "HR", priority: "High" },
    },
    position: { x: 250, y: 50 },

    sourcePosition: "bottom",
    targetPosition: "top",
  },
];

export const initialEdges = [];

export const getInitialNodeData = (type) => {
  switch (type) {
    case NODE_TYPES.START:
      return { title: "New Start", metadata: {} };
    case NODE_TYPES.TASK:
      return {
        title: "New Task",
        description: "",
        assignee: "HR Coordinator",
        dueDate: new Date().toISOString().slice(0, 10),
        customFields: {},
      };
    case NODE_TYPES.APPROVAL:
      return {
        title: "New Approval",
        approverRole: "Manager",
        autoApproveThreshold: 80,
      };
    case NODE_TYPES.AUTOMATED_STEP:
      return {
        title: "New Automation",
        actionId: "",
        actionLabel: "",
        actionParams: {},
      };
    case NODE_TYPES.END:
      return {
        title: "Workflow End",
        endMessage: "Workflow completed successfully.",
        summaryFlag: true,
      };
    default:
      return { title: "Untitled Node" };
  }
};
