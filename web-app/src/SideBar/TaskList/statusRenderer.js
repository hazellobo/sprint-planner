import React, { useState } from "react";

function StatusRenderer(props) {
  const [type, setStatus] = useState(props.value);

  const onStatusChange = (event) => {
    props.onStatusChange(event.target.value);
    setStatus(event.target.value);
  };
  return (
    <div>
      <select onChange={onStatusChange}>
        <option value="red"> Open </option>
        <option value="black"> In progress </option>
        <option value="green"> Closed </option>
      </select>
    </div>
  );
}

export default StatusRenderer;
