import React, { useState } from "react";
import { Row, Tag } from "antd";
const { CheckableTag } = Tag;

const SizeButton = ({ size }) => {
  const [checked, toggle] = useState(false);
  return (
    <CheckableTag checked={checked} onChange={toggle}>
      {size}
    </CheckableTag>
  );
};

const SizeChart = () => (
  <Row>
    {["S", "M", "L", "XL"].map((size, i) => (
      <SizeButton key={i} size={size} />
    ))}
  </Row>
);

export default SizeChart;
