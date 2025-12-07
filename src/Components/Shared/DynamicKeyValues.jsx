import React, { useState, useEffect } from "react";

let globalKeyCounter = 1000;
const DynamicKeyValues = ({ initialData, onChange }) => {
  const initialArray = Object.entries(initialData || {}).map(
    ([key, value]) => ({
      id: key,
      key: key,
      value: value,
    })
  );

  const [items, setItems] = useState(initialArray);
  let nextId = initialArray.length;

  useEffect(() => {
    const newObject = items.reduce((acc, item) => {
      if (item.key.trim()) {
        acc[item.key] = item.value;
      }
      return acc;
    }, {});
    onChange(newObject);
  }, [items]);

  const handleItemChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = () => {
    const newId = `custom_field_${globalKeyCounter++}`;
    setItems((prevItems) => [...prevItems, { id: newId, key: "", value: "" }]);
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "5px",
            marginBottom: "8px",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Key"
            value={item.key}
            onChange={(e) => handleItemChange(item.id, "key", e.target.value)}
            style={{ flex: 1, padding: "6px" }}
          />
          <input
            type="text"
            placeholder="Value"
            value={item.value}
            onChange={(e) => handleItemChange(item.id, "value", e.target.value)}
            style={{ flex: 1, padding: "6px" }}
          />
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            style={{
              padding: "6px 10px",
              background: "#ccc",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            -
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        style={{
          padding: "6px 10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
          width: "100%",
          marginTop: "5px",
        }}
      >
        + Add Field
      </button>
    </div>
  );
};

export default DynamicKeyValues;
