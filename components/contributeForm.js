import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component{
  //if we don't provide construcor, we can use class fields which can be used as this.varName
  // and props passed by parent component can be directly accessed as this.props.varName ex - this.props.address
  // constructor(props){
  //   super(props);
  //   this.state={
  //     value: ""
  //   }
  // }

  state = {
    value: ""
  }

  onSubmit = async event => {
    event.preventDefault();
    console.log('here -', this.state.value);
    console.log('add of campaign-', this.props.address);
    try{
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      console.log('acc- ', accounts);
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, 'ether')
      });
      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch(err){

    }

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
