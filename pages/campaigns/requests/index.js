import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Link } from '../../../routes';
import { Button } from 'semantic-ui-react';

class RequestIndex extends Component{
  static async getInitialProps(props){
    console.log('add - ', props.query.address);
    return {
      address: props.query.address
    };
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
