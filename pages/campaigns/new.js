import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input } from 'semantic-ui-react';

class CampaignNew extends Component{
  constructor(props){
    super(props);
    this.state = {
      minimumContribution : ''
    }
  }
  render(){
    return(
        <Layout>
          <h3>Create a new Campaign!</h3>
            <Form>
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
