import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "./DictEntryStyle.css"

class DictEntryComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      registers: props.registers,
      definitions: props.definitions,
      examples: props.examples
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      registers: nextProps.registers,
      definitions: nextProps.definitions,
      examples: nextProps.examples
    })
  }
  render() {
    const state = this.state;
    return (
      <div className="entry">
        <div className="def">
          {
            state.registers &&
            <span className="registers">{state.registers.join(" ")}</span>
          }
          <span >{state.definitions.join(" ")}</span>
        </div>
        {
          state.examples.map((example, index) => {
            return (
              <div key={index} className="exg">
                {
                  example.registers &&
                  <span className="registers">{example.registers.join(" ")}</span>
                }
                <span>'{example.text}'</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}
DictEntryComponent.propTypes = {
  examples: PropTypes.array,
  registers: PropTypes.array,
  definitions: PropTypes.array
}
DictEntryComponent.defaultProps = {
  examples: [],
  registers: [],
  definitions: []
}
export default DictEntryComponent;
