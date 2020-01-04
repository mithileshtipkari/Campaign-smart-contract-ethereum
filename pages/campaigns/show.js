import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

class ShowCampaign extends Component{
  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummery().call();//getSummery spelling is wrong
    console.log('summary -', summary);
    return {};
  }
  render(){
    return (
      <Layout>
        <h3>Campaign Info</h3>
      </Layout>
    )
  }
}

export default ShowCampaign;
