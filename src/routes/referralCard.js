import { lazy } from 'react';

export default {
  exact: true,
  name: 'Referral',
  protected: true,
  path: '/referral',
  component: lazy(() => import('containers/ReferralCard')),
};
