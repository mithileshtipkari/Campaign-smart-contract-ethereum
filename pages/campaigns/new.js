import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Form, Button } from 'semantic-ui-react';

class CampaignNew extends Component{
  render(){
    return(
        <Layout>
          <h3>Create a new Campaign!</h3>
          <Form>
            <Form.Field>
              <label>Minimum Contribution</label>
              <input placeholder='Minimum Contribution in Wei' />
            </Form.Field>
            <Button primary type='submit'>Create</Button>
          </Form>
        </Layout>
    )
  }
}

export default CampaignNew;
