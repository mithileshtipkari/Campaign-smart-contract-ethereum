import React, { Component } from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import web3 from '../ethereum/web3';
class CampaignIndex extends Component{
  static async getInitialProps(){
    // console.log('web3 in index-', web3);
    const accounts = await web3.eth.getAccounts();
    console.log('accounts -', accounts);
    console.log("getting initial props");
    var campaignCount = await factory.methods.campaignCount().call();
    console.log('campaignCount -- ', campaignCount);
    // await factory.methods.createCampaign(1,"Populating mars","elon musk").send({
    //   from : accounts[0],
    //   gas : '2000000'
    // });
    campaignCount = await factory.methods.campaignCount().call();
    console.log('campaignCount after-- ', campaignCount);
    const okarr = await factory.methods.campaignInfoArray(0).call();
    console.log('ok--', okarr);
    console.log('name -', okarr.name);
    // const campaigns = await factory.methods.campaignInfoArray().call();
    // console.log("campaigns size -", campaigns.length);

    const message = "hi mith";
    return { message } ;
  }

  renderCards(){
    console.log('in render cards');
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
    console.log('in campaign add button');
    //button floated to right
    return (
      <Button floated="right" content="Create a Campaign" icon="plus" labelPosition="left" primary/>
    );
  }

  async ok(){
    // console.log('in ok -', this.state.message);
    const campaignCount = await factory.methods.campaignCount().call();
    console.log('campaignCount in ok-- ', campaignCount);
  }
  render(){
    // this.ok();
    return(
      <Layout>
        <div>
          <h3 style={{marginTop:'10px'}}>Open Campaigns</h3>

        </div>
      </Layout>
    );
  }
}

export default CampaignIndex;
