import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import getProvidersCountries from 'redux/actions/providers/getProvidersCountries';
import getProviders from 'redux/actions/providers/getProviders';
import TopUp from 'components/MoneyTransfer/TopUp'

const TopUpContainer = ({})=> {
    const [form, setForm] = useState({});
    const dispatch = useDispatch();
    const [selectedCountry,setSelectedCountry]=useState({});
    const {providersCountries} = useSelector(({providersCountries}) => providersCountries)
    const {
      userLocationData,
    } = useSelector(({ user }) => user);
    
    const onOptionsChange = (e, { name, value }) => {
      setForm({ ...form, [name]: value });
    };
    const currentCountryOption = providersCountries.data && providersCountries.data.find(
      ({ CountryCode }) => {
        if(userLocationData.CountryCode){
          return CountryCode.toLowerCase() === userLocationData.CountryCode
        }

      }
    )
    useEffect(()=>{
      if(currentCountryOption){
        setSelectedCountry(currentCountryOption)
      }
          },[currentCountryOption])

    useEffect(()=> {
      getProvidersCountries()(dispatch);
    }, [])

    useEffect(()=>{
if(form.CountryCode){

  const newCountry = providersCountries.data && providersCountries.data.find(
    ({ CountryCode }) => {
        return CountryCode.toLowerCase() === form.CountryCode.toLowerCase()
      }
  )
  setSelectedCountry(newCountry)
}
    },[form])

  const submitFormHandler = () => {
    console.log('form :>> ', form);
    if(form.CountryCode){
      getProviders(form.CountryCode.toLowerCase())(dispatch);
    }
    
  }
  const resetFormHandler = () => {

  }

  return (
    <TopUp
      providersCountries={providersCountries.data}
      currentCountryOption={selectedCountry}
      onOptionsChange={onOptionsChange}
      submitFormHandler={submitFormHandler}
      resetFormHandler={resetFormHandler}
    />
  )
}

TopUp.propTypes = {

}

TopUp.defaultProps = {

}

export default TopUpContainer;