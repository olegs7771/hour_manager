import React from "react";
import { css } from "@emotion/core";
import DotLoader from "react-spinners/DotLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

export class DotLoaderSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <DotLoader
          css={override}
          size={40}
          color={"#c2c2d6"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}
