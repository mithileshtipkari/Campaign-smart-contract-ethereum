import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

class CampaignIndex extends Component{
  static async getInitialProps(){
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns} ;
  }

  renderCards(){
    const items = this.props.campaigns.map(address => {
      return {
        header : address,
        description : <a>View details</a>,
        fluid : true
      }
    });

    return <Card.Group items={items} />;
  }

  campaignAddButton(){
    //button floated to right
    return (
      <Button floated="right" content="Create a Campaign" icon="plus" labelPosition="left" primary/>
    );
  }

  render(){
    return(
      <Layout>
        <div>
          <h3 style={{marginTop:'10px'}}>Open Campaigns</h3>
          {this.campaignAddButton()}
          {this.renderCards()}
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
