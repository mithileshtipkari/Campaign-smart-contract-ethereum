import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Form, Input, Button } from 'semantic-ui-react';

class CreateRequest extends Component{
  static getInitialProps(props){
    console.log('in props-', props.query.address);

    return {
      
    };
  }
  onSubmit = async (event) => {
    event.preventDefault();
  }
  render(){
    return(
      <Layout>
        <h3>Create a Request to spend</h3>
        <hr/>
        <Form onSubmit={this.onSubmit}>

        </Form>
      </Layout>
    );
  }
}

export default CreateRequest;
