import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component{
  constructor(props){
    super(props);
    this.state = {
      minimumContribution : '',
      name: '',
      description: '',
      errorMessage: ''
    }
  }

  onSubmit = async (event) => {
    try{

      event.preventDefault();
      console.log('here');
      console.log('contri-', this.state.minimumContribution);
      console.log('name -', this.state.name);
      console.log('desc-', this.state.description);
      const accounts = await web3.eth.getAccounts();
      console.log('acc- ', accounts);
      factory.methods
        .createCampaign(this.state.minimumContribution, this.state.name, this.state.description)
        .send({
          from : accounts[0]
        });
    } catch (err){
      console.log('wrong - ', err.message);
      this.setState({ errorMessage: err.message});
    }
  }

  render(){
    return(
        <Layout>
          <h3>Create a new Campaign!</h3>
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
              <Form.Field>
                <label>Minimum Contribution</label>
                <Input label='wei'
                        labelPosition='right'
                        placeholder='Minimum Contribution in Wei'
                        value={this.state.minimumContribution}
                        onChange={event => {this.setState({ minimumContribution : event.target.value})}}
                        />

                <Input label='Name of Contract'

                        labelPosition='right'
                        placeholder="Title of the contract"
                        value={this.state.name}
                        onChange={event => {this.setState({name : event.target.value})}}
                        />

                <Input label='Description of contract'
                        labelPosition='right'
                        placeholder='Description of contract'
                        value = {this.state.description}
                        onChange={event => {this.setState({description:event.target.value})}}
                        />
              </Form.Field>
              <Message error header="Oops some error occurred!" list={[this.state.errorMessage]} />
              <Button primary type='submit'>Create</Button>
            </Form>
        </Layout>
    )
  }
}

export default CampaignNew;
