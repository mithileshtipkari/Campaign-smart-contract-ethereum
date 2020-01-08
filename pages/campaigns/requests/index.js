import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button, Table } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/requestRow';

class RequestIndex extends Component{
  static async getInitialProps(props){
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const contributorsCount = await campaign.methods.contributorsCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount))
        .fill()
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        }));
    return { address, requests, requestCount, contributorsCount };
  }

  renderRows(){
    return this.props.requests.map((request, index) => {
      return <RequestRow
          key={index}
          id={index}
          request={request}
          address={this.props.address}
          contributorsCount={this.props.contributorsCount}
        />;
    });
  }

  render(){
    const { Header, Row, HeaderCell, Body, Cell } = Table;
    return(
      <div>
        <Layout>
          <h3>Campaign Requests</h3>
          <Link route={`/campaigns/${this.props.address}/requests/create`}>
            <a>
              <Button primary>Create Request</Button>
            </a>
          </Link>
          <Table>
            <Header>
              <Row>
                <HeaderCell>ID</HeaderCell>
                <HeaderCell>Description</HeaderCell>
                <HeaderCell>Amount</HeaderCell>
                <HeaderCell>Recipient</HeaderCell>
                <HeaderCell>Approval Count</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Finalize</HeaderCell>
              </Row>
            </Header>
            <Body>
                {this.renderRows()}
            </Body>
          </Table>
        </Layout>
      </div>
    );
  }
}

export default RequestIndex;
