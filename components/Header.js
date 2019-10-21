import React from 'react';
import { Menu, Header } from 'semantic-ui-react';

export default () => {
  return(
    <div>
      <Header style={{marginTop:'10px'}} as="h2" icon="money" content="Distributed Crowdfunding Platform" />
      <Menu>
        <Menu.Item>
         Distributed Campaign
        </Menu.Item>
        <Menu.Menu position="right">
        <Menu.Item>
         Campaigns
        </Menu.Item>
        <Menu.Item>
         +
        </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};
