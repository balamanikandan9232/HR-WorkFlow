import React, { useState } from "react";
import DynamicKeyValues from "../Shared/DynamicKeyValues";

const StartNodeForm = ({ nodeData, onDataChange }) => {
  const [formData, setFormData] = useState(nodeData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleMetadataChange = (metadata) => {
    const newData = { ...formData, metadata };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <form>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>
          Start Title
        </label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div
        style={{
          marginBottom: "15px",
          padding: "10px",
          border: "1px dashed #ddd",
        }}
      >
        <label
          style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}
        >
          Optional Metadata (Key/Value)
        </label>
        <DynamicKeyValues
          initialData={formData.metadata || {}}
          onChange={handleMetadataChange}
        />
      </div>
    </form>
  );
};

export default StartNodeForm;
