import React, { useState } from "react";

function TypeRenderer(props) {
  const [type, setType] = useState(props.value);

  const onTypeChange = (event) => {
    props.onTypeChange(event.target.value);
    setType(event.target.value);
  };
  return (
    <div>
      <select onChange={onTypeChange}>
        <option value="red"> Bug </option>
        <option value="black"> Story </option>
        <option value="green"> Task </option>
      </select>
    </div>
  );
}

export default TypeRenderer;
