import React, { useState } from "react";
import DynamicKeyValues from "../Shared/DynamicKeyValues";

const TaskNodeForm = ({ nodeData, onDataChange }) => {
  const [formData, setFormData] = useState(nodeData);
  const [titleError, setTitleError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" && !value.trim()) {
      setTitleError("Title is required.");
    } else if (name === "title") {
      setTitleError("");
    }

    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleCustomFieldsChange = (customFields) => {
    const newData = { ...formData, customFields };
    setFormData(newData);
    onDataChange(newData);
  };

  return (
    <form>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>
          Title <span style={{ color: "red" }}>*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "8px",
            border: titleError ? "1px solid red" : "1px solid #ccc",
          }}
        />
        {titleError && (
          <p style={{ color: "red", fontSize: "0.8em", marginTop: "5px" }}>
            {titleError}
          </p>
        )}
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>
          Description
        </label>
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          rows="3"
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>
          Assignee (Field/User)
        </label>
        <input
          type="text"
          name="assignee"
          value={formData.assignee || ""}
          onChange={handleChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate || ""}
          onChange={handleChange}
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
          Optional Custom Fields (K/V)
        </label>
        <DynamicKeyValues
          initialData={formData.customFields || {}}
          onChange={handleCustomFieldsChange}
        />
      </div>
    </form>
  );
};

export default TaskNodeForm;
