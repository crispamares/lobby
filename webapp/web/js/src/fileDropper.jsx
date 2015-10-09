import React, { PropTypes } from 'react'
import {Link} from 'react-router';
import _ from 'lodash';

export default class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {onTop: false};
  }
  onFileDrop(e) {
    e.stopPropagation();
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    console.log('File you dragged here is', file.path);
    this.props.onFileDrop(file.path);
  }
  dontHandle(e) {
    e.stopPropagation();
    e.preventDefault()
  }
  render() {
    let borderColor = (this.state.onTop) ? "red" : "grey";

    return (
      <div
        draggable="true"
        className="well"
        style={ {borderColor: borderColor, height: "50em"} }
        onDragOver={ e => {this.setState({onTop: true}); this.dontHandle(e)} }
        onDragLeave={ e => {this.setState({onTop: false}); this.dontHandle(e)} }
        onDragEnd={ e => {this.setState({onTop: false}); this.dontHandle(e)} }
        onDrop={ e => {this.onFileDrop(e)} }>
        <span> Drop here a CSV file </span>
      </div>
    );
  }
}
