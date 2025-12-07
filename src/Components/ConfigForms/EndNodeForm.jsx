import React, { useState } from "react";

const EndNodeForm = ({ nodeData, onDataChange }) => {
  const [formData, setFormData] = useState(nodeData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

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
          End Message
        </label>
        <textarea
          name="endMessage"
          value={formData.endMessage || ""}
          onChange={handleChange}
          rows="3"
          style={{ width: "100%", padding: "8px" }}
          placeholder="e.g., Successfully initiated the employee record."
        />
      </div>

      <div
        style={{
          marginBottom: "15px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <input
          type="checkbox"
          id="summaryFlag"
          name="summaryFlag"
          checked={formData.summaryFlag || false}
          onChange={handleChange}
        />
        <label htmlFor="summaryFlag" style={{ fontWeight: "bold" }}>
          Mark as Summary Step
        </label>
      </div>
    </form>
  );
};

export default EndNodeForm;
