import React, { useState, useMemo } from "react";
import { useAutomations } from "../../hooks/useAutomations";

const AutomatedStepNodeForm = ({ nodeData, onDataChange }) => {
  const [formData, setFormData] = useState(nodeData);
  const { automations, isLoading } = useAutomations();

  const selectedAutomation = useMemo(() => {
    return automations.find((a) => a.id === formData.actionId);
  }, [automations, formData.actionId]);

  const handleStaticChange = (e) => {
    const { name, value } = e.target;

    let newData = { ...formData, [name]: value };

    if (name === "actionId") {
      const selected = automations.find((a) => a.id === value);
      newData = {
        ...newData,
        actionLabel: selected?.label || "",
        actionParams: {},
      };
    }

    setFormData(newData);
    onDataChange(newData);
  };

  const handleParamChange = (key, value) => {
    const newParams = { ...formData.actionParams, [key]: value };
    const newData = { ...formData, actionParams: newParams };
    setFormData(newData);
    onDataChange(newData);
  };

  if (isLoading) return <div>Loading available automations...</div>;

  return (
    <form>
      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title || ""}
          onChange={handleStaticChange}
          style={{ width: "100%", padding: "8px" }}
        />
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label style={{ display: "block", fontWeight: "bold" }}>
          Automated Action <span style={{ color: "red" }}>*</span>
        </label>
        <select
          name="actionId"
          value={formData.actionId || ""}
          onChange={handleStaticChange}
          style={{ width: "100%", padding: "8px" }}
        >
          <option value="">Select an action...</option>
          {automations.map((a) => (
            <option key={a.id} value={a.id}>
              {a.label}
            </option>
          ))}
        </select>
      </div>

      {selectedAutomation && (
        <fieldset
          style={{
            border: "1px solid #007bff",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          <legend style={{ fontWeight: "bold", color: "#007bff" }}>
            Action Parameters
          </legend>
          {selectedAutomation.params.map((param) => (
            <div key={param.key} style={{ marginBottom: "10px" }}>
              <label style={{ display: "block" }}>
                {param.key}{" "}
                {param.required && <span style={{ color: "red" }}>*</span>}
              </label>
              <input
                type={param.type === "text" ? "textarea" : param.type}
                value={formData.actionParams?.[param.key] || ""}
                onChange={(e) => handleParamChange(param.key, e.target.value)}
                placeholder={param.hint || ""}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
          ))}
        </fieldset>
      )}
    </form>
  );
};

export default AutomatedStepNodeForm;
