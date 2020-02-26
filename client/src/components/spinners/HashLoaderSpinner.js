import React from "react";
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: green;
`;

export class HashLoaderSpinner extends React.Component {
  render() {
    return (
      <div className="sweet-loading">
        <HashLoader
          css={override}
          size={40}
          color={"#c2c2d6"}
          loading={this.props.loading}
        />
      </div>
    );
  }
}
