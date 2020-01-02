import React from 'react';
import { Menu, Header } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return(
    <div>
      <Header style={{marginTop:'10px'}} as="h2" icon="money" content="Distributed Crowdfunding Platform" />
      <Menu>
        <Link route="/">
          <a className="item">Homepage</a>
        </Link>
        <Menu.Menu position="right">
          <Link route="/campaigns/new">
            <a className="item">Create a Campaign</a>
          </Link>
        </Menu.Menu>
      </Menu>
    </div>
  );
};
