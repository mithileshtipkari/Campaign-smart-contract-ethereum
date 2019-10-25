import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input } from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class CampaignNew extends Component{
  constructor(props){
    super(props);
    this.state = {
      minimumContribution : ''
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    console.log('here');
    console.log(this.state.minimumContribution);
    const accounts = await web3.eth.getAccounts();
    console.log('acc- ', accounts);
    factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from : accounts[0]
      });
  }

  render(){
    return(
        <Layout>
          <h3>Create a new Campaign!</h3>
            <Form onSubmit={this.onSubmit}>
              <Form.Field>
                <label>Minimum Contribution</label>
                <Input label='wei'
                        labelPosition='right'
                        placeholder='Minimum Contribution in Wei'
                        value={this.state.minimumContribution}
                        onChange={event => {this.setState({ minimumContribution : event.target.value})}}
                        />
              </Form.Field>
              <Button primary type='submit'>Create</Button>
            </Form>
        </Layout>
    )
  }
}

export default CampaignNew;
