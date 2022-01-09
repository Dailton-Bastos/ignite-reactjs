import React from 'react';
import { setupAPIClient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

const Metrics = () => {
  return (
    <div>
      <h1>Metrics:</h1>
    </div>
  );
};

export default Metrics;

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/me');

    console.log(response.data);

    return {
      props: {},
    };
  },
  {
    permissions: ['metrics.list'],
    roles: ['administrator'],
  }
);
