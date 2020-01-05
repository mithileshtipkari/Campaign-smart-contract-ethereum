import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Header, Icon, Card } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';

class ShowCampaign extends Component{
  static async getInitialProps(props){
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();//getSummery spelling is wrong
    console.log('summary -', summary);
    return {
      name: summary[0],
      description: summary[1],
      minimumContribution: summary[2],
      balance: summary[3],
      requests: summary[4],
      contributors: summary[5],
      manager: summary[6]
    };
  }

  renderHeading(){
    const{ name, description } = this.props;
    return [
      <Header as='h2'>{name}</Header>,
      <Header as='h3'>{description}</Header>
    ];
  }
  renderCards(){
      const{
        balance, minimumContribution, requests,contributors, manager
      } = this.props;
      const items= [
      {
        meta: 'Minimum Contribution',
        header: minimumContribution,
        description: 'This is the minimum contribution to this Campaign in order to become an contributor'
      },
      {
        meta: 'Balance available in this Campaign (ether)',
        header: web3.utils.fromWei(balance, 'ether'),
        description: 'This is the balance remaining in the Campaign'
      },
      {
        meta: 'Requests count',
        header: requests,
        description: 'No. of requests to spend the amount in the Campaign'
      },
      {
        meta: 'Contributors count',
        header: contributors,
        description: 'Total number of people contributing to this Campaign'
      },
      {
        meta: 'Manager address',
        header: manager,
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
        <hr/>
        {this.renderHeading()}
        {this.renderCards()}
        <ContributeForm />
      </Layout>
    );
  }
}

export default ShowCampaign;
