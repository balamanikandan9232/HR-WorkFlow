import { mockAutomations } from "./automation";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAutomations = async () => {
  await sleep(300);
  return mockAutomations;
};

export const simulateWorkflow = async (workflowGraph) => {
  await sleep(1500);

  const log = [];
  const startNode = workflowGraph.nodes.find((n) => n.type === "startNode");

  if (!startNode) {
    log.push("[ERROR] CRITICAL: Missing Start Node. Workflow cannot begin.");
    return { success: false, log };
  }

  log.push(`[INFO] Simulation Started: ${startNode.data.title}`);
  let currentNodeId = startNode.id;
  let steps = 0;
  const MAX_STEPS = 10;
  const visitedNodes = new Set();

  while (steps < MAX_STEPS) {
    if (visitedNodes.has(currentNodeId)) {
      log.push(
        `[ERROR] Workflow Cycle Detected at Node ${currentNodeId}. Execution halted.`
      );
      return { success: false, log };
    }
    visitedNodes.add(currentNodeId);

    const currentNode = workflowGraph.nodes.find((n) => n.id === currentNodeId);
    if (!currentNode) break;

    const outgoingEdges = workflowGraph.edges.filter(
      (e) => e.source === currentNodeId
    );


    let action = `${currentNode.data.title}`;
    if (currentNode.type === "endNode") {
      log.push(`[SUCCESS] Workflow Completed: ${action}`);
      return { success: true, log };
    }
    log.push(
      `[STEP ${
        steps + 1
      }] Executing ${currentNode.type.toUpperCase()}: ${action}`
    );

   
    if (outgoingEdges.length === 0) {
      log.push(
        `[ERROR] Workflow Halted: Node ${currentNodeId} (${currentNode.data.title}) has no outgoing connection.`
      );
      return { success: false, log };
    }

    currentNodeId = outgoingEdges[0].target;
    steps++;
  }

  log.push("[WARNING] Workflow execution reached max steps (10).");
  return { success: false, log };
};
