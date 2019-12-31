import React, { Component } from 'react';
import { Card, Button, Icon, Item } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import CampaignInformation from '../ethereum/CampaignInformation';
class CampaignIndex extends Component{
  static async getInitialProps(){
    const accounts = await web3.eth.getAccounts();

    const campaignCount = await factory.methods.campaignCount().call();

    var campaignsList = [];

    for( var i = 0; i < campaignCount; i++){
        var campaignInfoOnBlockchain = await factory.methods.campaignInfoArray(i).call();
        var campaignInformation = new CampaignInformation(
                            campaignInfoOnBlockchain.name,
                            campaignInfoOnBlockchain.description,
                            campaignInfoOnBlockchain.minimumContribution,
                            campaignInfoOnBlockchain.deployedCampaignAddress
                        );
        campaignsList.push(campaignInformation);
    }

    return { campaignsList } ;
  }

  renderCards(){
    console.log('in render cards');
    // let childKey = -1;

    const items = this.props.campaignsList.map( campaign => {
      // childKey++;
      return {
        // childKey: childKey,
        header: campaign.name,
        description: campaign.description,
        meta: 'Minimum Contribution to this Campaign is - ' + campaign.minimumContribution + ' Wei',
        extra: 'This campaign is deployed to address - ' + campaign.deployedCampaignAddress,
        fluid : true
      }
    });

    return <Card.Group items={items} />;
  }

  campaignAddButton(){
    console.log('in campaign add button');
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
          <div>{this.renderCards()}</div>
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
