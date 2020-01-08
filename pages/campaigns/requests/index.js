import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';

class RequestIndex extends Component{
  static async getInitialProps(props){
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    console.log('requestCount -', requestCount);

    const requests = await Promise.all(
      Array(requestCount)
        .fill()
        .map((element, index) => {
          console.log('index -', index);
          return campaign.methods.requests(index).call();
        }));

    console.log('requests -', requests);
    return { address };
  }
  render(){
    return(
      <div>
        <Layout>
          <h3>Campaign Requests</h3>
          <Link route={`/campaigns/${this.props.address}/requests/create`}>
            <a>
              <Button primary>Create Request</Button>
            </a>
          </Link>
        </Layout>
      </div>
    );
  }
}

export default RequestIndex;
