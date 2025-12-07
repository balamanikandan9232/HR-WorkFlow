import React, { useState } from "react";

const ApprovalNodeForm = ({ nodeData, onDataChange }) => {
  const [formData, setFormData] = useState(nodeData);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? parseFloat(value) : value;

    const newData = { ...formData, [name]: newValue };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <form>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>
          Approver Role
        </label>
        <select
          name="approverRole"
          value={formData.approverRole || "Manager"}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="Manager">Direct Manager</option>
          <option value="HRBP">HR Business Partner</option>
          <option value="Director">Department Director</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>
          Auto-approve Threshold (%)
        </label>
        <input
          type="number"
          name="autoApproveThreshold"
          value={formData.autoApproveThreshold || 0}
          onChange={handleChange}
          min="0"
          max="100"
          style={{ width: "100%", padding: "8px" }}
        />
        <p style={{ fontSize: "0.8em", color: "#666", marginTop: "5px" }}>
          If approval score exceeds this percentage, the step auto-passes.
        </p>
      </div>
    </form>
  );
};

export default ApprovalNodeForm;
