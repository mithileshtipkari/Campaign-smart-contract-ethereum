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
    // await factory.methods.createCampaign(1,"IronMan suite","I believe I can fly").send({
    //   from : accounts[0],
    //   gas : '2000000'
    // });
    const names= [];
    const descriptions = [];
    const minContri = [];

    for( var i = 0; i < campaignCount; i++){
        var campaignInfo = await factory.methods.campaignInfoArray(i).call();

        console.log('---------------' + (i+1) + '----------------------');
        console.log('campaignInfo--', campaignInfo);
        console.log('name -', campaignInfo.name);
        console.log('decs -', campaignInfo.description);
        console.log('minContri -', campaignInfo.minimumContribution);
        console.log('add -', campaignInfo.deployedCampaignAddress);
    }

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
