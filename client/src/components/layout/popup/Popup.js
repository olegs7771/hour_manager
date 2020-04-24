import React, { useState } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

const Popup = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  return (
    <div style={{ marginLeft: props.margin }}>
      <Button id="Popover1" type="button">
        {props.icon}
      </Button>
      <Popover
        placement={props.placement}
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader>{props.title}</PopoverHeader>
        <PopoverBody>{props.body}</PopoverBody>
      </Popover>
    </div>
  );
};

export default Popup;
