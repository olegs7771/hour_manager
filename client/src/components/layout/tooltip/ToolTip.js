import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const ToolTip = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => setTooltipOpen(!tooltipOpen);
  return (
    <div>
      <span id="TooltipExample">{props.text}</span>

      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        target="TooltipExample"
        toggle={toggle}
      >
        {props.message}
      </Tooltip>
    </div>
  );
};
export default ToolTip;
