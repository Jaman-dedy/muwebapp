import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TopUp from 'components/MoneyTransfer/TopUp'

const TopUpContainer = ()=> {
    const [step, setStep] = useState(1);

  return (
    <TopUp
    
    />
  )
}

TopUp.propTypes = {

}

TopUp.defaultProps = {

}

export default TopUpContainer;