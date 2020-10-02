import Contacts from 'containers/contacts';

export default {
  exact: false,
  name: 'Contacts',
  protected: true,
  path: '/contact/:id',
  component: Contacts,
};
