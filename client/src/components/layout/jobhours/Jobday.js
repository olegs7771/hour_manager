import React, { Component } from "react";
import { connect } from "react-redux";

export class Jobday extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messages !== this.props.messages) {
    }
  }

  render() {
    return <div className="border"> Job day here</div>;
  }
}

const mapStateToProps = state => ({
  messages: state.messages.messages,
  loading: state.jobday.loading,
  selectedDay: state.jobday.selectedDay
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Jobday);
