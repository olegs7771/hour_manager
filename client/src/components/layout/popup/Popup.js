import React, { useState } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";

const Popup = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Button id="Popover1" type="button" onClick={props.delete}>
        {props.icon}
      </Button>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target="Popover1"
        toggle={toggle}
      >
        <PopoverHeader>{props.title}</PopoverHeader>
        <PopoverBody>
          <div className="text-danger">
            {props.text}

            <button
              className="btn btn-outline-danger"
              onClick={props._deleteEmployee}
            >
              Confirm
            </button>
          </div>
        </PopoverBody>
      </Popover>
    </div>
  );
};

export default Popup;
