import React, { Component } from 'react';
import { Card, Button, Icon, Item } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
import CampaignInformation from '../ethereum/CampaignInformation';
import { Link } from '../routes';

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
        extra: (
          <Link route={`/campaigns/${campaign.deployedCampaignAddress}`}>
            <a>
              <Button
                content="View Campaign"
                primary
              >
              </Button>
            </a>
          </Link>
        ),
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
          <h3 style={{marginTop:'10px'}}>Created Campaigns</h3>
          <Link route='/campaigns/new'>
            <a>
              <Button floated="right"
                      content="Create a Campaign"
                      icon="add circle"
                      primary
              ></Button>
            </a>
          </Link>
          <div>{this.renderCards()}</div>
        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
