import React from 'react'
import { Tab } from 'semantic-ui-react'


const TabExampleVerticalTabular = ({panes}) => (
  <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
)

export default TabExampleVerticalTabular