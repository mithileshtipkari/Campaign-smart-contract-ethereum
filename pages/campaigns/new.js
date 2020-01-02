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
      errorMessage: '',
      loading: false
    }
  }

  onSubmit = async (event) => {
      event.preventDefault();
      this.setState({ loading : true });
      try{
        const accounts = await web3.eth.getAccounts();
        await factory.methods
          .createCampaign(this.state.minimumContribution, this.state.name, this.state.description)
          .send({
            from : accounts[0]
          });
      }catch (err){ // errors that occur within await can be caught using try-catch but error in promises are to be caught by chaining/attaching .catch to promise
        this.setState({ errorMessage: err.message});
      }
      this.setState({ loading : false});
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
              <Button loading={this.state.loading} primary type='submit'>Create</Button>
            </Form>
        </Layout>
    )
  }
}

export default CampaignNew;
