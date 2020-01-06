import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';

class ContributeForm extends Component{
  state={
    value: ""
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log('here');
  }
  render(){
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value})}
            label="ether"
            labelPosition="right"
          />
        </Form.Field>
        <Button primary>Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
