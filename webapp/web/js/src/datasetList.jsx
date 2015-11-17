import React, { PropTypes } from 'react'

import _ from 'lodash';
import {Link} from 'react-router';
import {Button, ListGroup, ButtonGroup} from 'react-bootstrap';


export default class DatasetList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      const datasets = this.props.datasets;
      const onLaunchClick =  this.props.onLaunchClick;
      const onEditClick =  this.props.onEditClick;
      if (_.isEmpty(datasets)) return <div></div>
      return (
          <div>
              <h3>Available Datasets</h3>
              <ListGroup>
                  {datasets.map( (dataset) => {
                      console.log(dataset);
                      return (
                          <li className="list-group-item">
                              <ButtonGroup>
                                  <Button bsStyle="primary" onClick={() => onLaunchClick(dataset)}> Launch </Button>
                                  <Button onClick={() => onEditClick(dataset)}> Edit </Button>
                              </ButtonGroup>
                              <span className="h4"> {dataset} </span>
                          </li>
                      )
                  })}
              </ListGroup>
          </div>
      );
  }
}
