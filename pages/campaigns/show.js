import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react';

class ShowCampaign extends Component{
  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummery().call();//getSummery spelling is wrong
    console.log('summary -', summary);
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requests: summary[2],
      contributors: summary[3],
      manager: summary[4]
    };
  }

  renderCards(){
      const{
        balance, minimumContribution, requests,contributors, manager
      } = this.props;
      const items= [
      {
        meta: 'Minimum Contribution',
        header: minimumContribution,
        description: 'This is the minimum contribution to this Campaign'
      },
      {
        header: 'Balance available in this Campaign',
        meta: balance,
        description: 'This is the balance remaining in the Campaign'
      },
      {
        header: 'Requests count',
        meta: requests,
        description: 'No. of requests to spend the amount in the Campaign'
      },
      {
        header: 'Contributors',
        meta: contributors,
        description: 'Total number of people contributing to this Campaign'
      },
      {
        header: 'Manager address',
        meta: manager,
        description: 'This is the address of the manager of the Campaign',
        style: { overflowWrap: 'break-word'}
      }
    ];

    return <Card.Group items={items}/>;
  }
  render(){
    return (
      <Layout>
        <h3>Campaign Info</h3>
        {this.renderCards()}
      </Layout>
    );
  }
}

export default ShowCampaign;
