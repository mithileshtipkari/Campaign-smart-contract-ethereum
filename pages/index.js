import React, { Component } from 'react';
import factory from '../ethereum/factory';

class CampaignIndex extends Component{
  static async getInitialProps(){
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns} ;
  }

  render(){
    return(
      <div>The deployed Campaign address - {this.props.campaigns}</div>
    );
  }
}

export default CampaignIndex;
