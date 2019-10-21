import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';

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
    return (
      <Button content="Create a Campaign" icon="plus" labelPosition="left" primary/>
    );
  }

  render(){
    return(
        <div>
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
          <h3>Open Campaigns</h3>
          {this.renderCards()}
          {this.campaignAddButton()}
        </div>
    );
  }
}

export default CampaignIndex;
