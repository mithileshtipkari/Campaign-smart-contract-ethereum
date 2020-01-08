import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';

class CreateRequest extends Component{
  state = {
    description:'',
    value:'',
    recipient:'',
    loading: false,
    errorMessage: ''
  };
  static async getInitialProps(props){
    const { address } = props.query;
    return {
      address
    };
  }
  onSubmit = async (event) => {
    event.preventDefault();
    try{
      this.setState({loading: true, errorMessage: ''});
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(this.props.address);
      const { description, value, recipient } = this.state;
      const valueInWei = web3.utils.toWei(value, 'ether');
      await campaign.methods.createRequest(description, valueInWei, recipient).send({
          from: accounts[0]
        });
    } catch (err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading: false});
  }
  render(){
    return(
      <Layout>
        <h3>Create a Request to spend</h3>
        <hr/>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Description</label>
            <Input label='Description' labelPosition="right" value={this.state.description} onChange={event => this.setState({description: event.target.value})}/>
          </Form.Field>
          <Form.Field>
            <label>Amount to spend</label>
            <Input label='ether' labelPosition="right" value={this.state.value} onChange={event => this.setState({value: event.target.value})}/>
          </Form.Field>
          <Form.Field>
            <label>Recipient Address</label>
            <Input label='Recipient Address' labelPosition="right" value={this.state.recipient} onChange={event => this.setState({recipient: event.target.value})}/>
          </Form.Field>
          <Message error header="Oops some error occurred!" content={this.state.errorMessage} />
          <Button primary type='submit' loading={this.state.loading}>Submit</Button>
        </Form>
      </Layout>
    );
  }
}

export default CreateRequest;
