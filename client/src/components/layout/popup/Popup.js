import React, { useState } from "react";
import { Button, Popover, PopoverHeader, PopoverBody } from "reactstrap";
import TextFormGroup from "../../textForms/TextFormGroup";

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
            <TextFormGroup
              placeholder={this.props.employeeName}
              name="email"
              onChange={this._onChange}
              value={this.state.email}
              type="email"
              error={this.state.errors.email}
            />
            <button
              className="btn btn-outline-danger"
              onClick={this._deleteEmployee.bind(this, this.props.id)}
              // disabled={!this.state.isActiveBtn}
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
