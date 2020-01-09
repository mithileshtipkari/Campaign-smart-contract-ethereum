import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

class RequestRow extends Component{
  onApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);
    await campaign.methods.approveRequest(this.props.id).send({
      from: accounts[0]
    });
  }

  onFinalize = async () => {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(this.props.address);
    await campaign.methods.finalizeRequest(this.props.id).send({
      from: accounts[0]
    });
  }

  render(){
    const { Row, Cell } = Table;
    const { id, request } = this.props;
    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
        <Cell>{request.recipient}</Cell>
        <Cell>{request.approvalCount}/{this.props.contributorsCount}</Cell>
        <Cell>
          <Button basic color="green" onClick={this.onApprove}>Approve</Button>
        </Cell>
        <Cell>
          <Button basic color="teal" onClick={this.onFinalize}>Finalize</Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;
