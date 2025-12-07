import React, { useState } from "react";
import { useWorkflow } from "../../context/WorkflowContext";
import { simulateWorkflow } from "../../api/api";

const WorkflowSandbox = () => {
  const { nodes, edges } = useWorkflow();
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState([]);
  const [error, setError] = useState(null);

  const handleSimulate = async () => {
    setIsSimulating(true);
    setError(null);
    setSimulationLog([]);

    const workflowGraph = { nodes, edges };

    try {
      setSimulationLog([
        "[INFO] Serializing workflow graph...",
        "[INFO] Sending to /simulate endpoint...",
      ]);

      const result = await simulateWorkflow(workflowGraph);

      setSimulationLog(result.log);
      if (!result.success) {
        setError("Simulation failed or halted. Check log for details.");
      }
    } catch (err) {
      setError("An unexpected network or system error occurred.");
      setSimulationLog((log) => [...log, `[FATAL] ${err.message}`]);
    } finally {
      setIsSimulating(false);
    }
  };

  const workflowJson = JSON.stringify({ nodes, edges }, null, 2);

  return (
    <div
      style={{
        borderTop: "1px solid #ccc",
        padding: "5px",
        marginTop: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h4>4. Workflow Test Sandbox</h4>
      <p>
        Serializes the current canvas state and sends it to the mock execution
        engine.
      </p>

      <button
        onClick={handleSimulate}
        disabled={isSimulating}
        style={{
          padding: "10px 15px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "15px",
          fontWeight: "bold",
        }}
      >
        {isSimulating ? "Executing Workflow..." : " Run Workflow Simulation"}
      </button>

      {error && (
        <div
          style={{
            color: "red",
            fontWeight: "bold",
            padding: "10px",
            border: "1px solid red",
            borderRadius: "4px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: 1 }}>
          <h5>Serialized Graph (JSON)</h5>
          <textarea
            readOnly
            value={workflowJson}
            rows="12"
            style={{
              width: "100%",
              backgroundColor: "#f4f4f4",
              padding: "10px",
              border: "1px solid #ddd",
              fontFamily: "monospace",
              fontSize: "12px",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h5>Execution Log</h5>
          <div
            style={{
              height: "270px",
              overflowY: "auto",
              backgroundColor: "#222",
              color: "#00ff73",
              padding: "10px",
              border: "1px solid #ddd",
              fontFamily: "monospace",
              whiteSpace: "pre-wrap",
              fontSize: "12px",
            }}
          >
            {simulationLog.length > 0
              ? simulationLog.join("\n")
              : "Press 'Run Simulation' to test the flow."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSandbox;
