import { lazy } from 'react';

export default {
  exact: false,
  name: 'Campaign Details',
  protected: true,
  path: '/publicity-details',
  component: lazy(() =>
    import('containers/Publicity/PublicityDetails'),
  ),
};
