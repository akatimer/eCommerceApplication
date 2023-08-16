import React, { useState } from 'react';
import './Registration.css';
import Button from '../Button/Button';
import PasswordInput from '../PasswordInput/PasswordInput';
import EmailInput from '../EmailInput/EmailInput';
import NameInput from '../NameInput/NameInput';
import LastNameInput from '../LastNameInput/LastNameInput';
import DateInput from '../DateInput/DateInput';
import StreetInput from '../StreetInput/StreetImput';
import CityInput from '../CityInput/CityInput';
import CountrySelect from '../CountrySelect/CountrySelect';
import PostalCodeInput from '../PostalCodeInput/PostalCodeInput';
import Checkbox from '../Сheckbox/CheckBox';
import { AddressDraft } from '@commercetools/platform-sdk';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingCountry, setBillingCountry] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [useShippingForBilling, setUseShippingForBilling] = useState(false);

  const shippingAddress: AddressDraft = {
    id: 'shipping',
    streetName: shippingStreet,
    city: shippingCity,
    country: shippingCountry,
    postalCode: shippingPostalCode,
  };

  const billingAddress: AddressDraft = {
    id: 'billing',
    streetName: useShippingForBilling ? shippingStreet : billingStreet,
    city: useShippingForBilling ? shippingCity : billingCity,
    country: useShippingForBilling ? shippingCountry : billingCountry,
    postalCode: useShippingForBilling ? shippingPostalCode : billingPostalCode,
  };

  const handleBillingCheckbox = (): void => {
    if (useShippingForBilling) {
      setBillingStreet(shippingStreet);
      setBillingCity(shippingCity);
      setBillingCountry(shippingCountry);
      setBillingPostalCode(shippingPostalCode);
    } else {
      setBillingStreet('');
      setBillingCity('');
      setBillingCountry('');
      setBillingPostalCode('');
    }
    setUseShippingForBilling((prev) => !prev);
  };

  const body = {
    email: email,
    password: password,
    dateOfBirth: date,
    addresses: [
      {
        firstName: name,
        lastName: lastName,
        ...shippingAddress,
      },
    ],
  };

  return (
    <section className="form form-reg">
      <div className="form-wrapper">
        <form className="auth-form reg-form" onSubmit={(e): void => e.preventDefault()}>
          <h1 className="form-title">Sign up</h1>
          <NameInput onChange={setName} />
          <LastNameInput onChange={setLastName} />
          <DateInput onChange={setDate} />
          <fieldset className="address">
            <legend>Address</legend>
            <div className="shipp-wrapper">
              <h2>Shipping</h2>
              <CountrySelect onChange={setShippingCountry} />
              <StreetInput onChange={setShippingStreet} />
              <CityInput onChange={setShippingCity} />
              <PostalCodeInput onChange={setShippingPostalCode} />
              <div className="checkbox-wrapper">
                <Checkbox onChange={(): void => {}} label="Use as default" />
                <Checkbox onChange={handleBillingCheckbox} label="Use for billing" />
              </div>
            </div>
            <div className="bill-wrapper">
              <h2>Billing</h2>
              <CountrySelect
                onChange={setBillingCountry}
                value={useShippingForBilling ? shippingCountry : billingCountry}
              />
              <StreetInput
                onChange={setBillingStreet}
                value={useShippingForBilling ? shippingStreet : billingStreet}
              />
              <CityInput
                onChange={setBillingCity}
                value={useShippingForBilling ? shippingCity : billingCity}
              />
              <PostalCodeInput
                onChange={setBillingPostalCode}
                value={useShippingForBilling ? shippingPostalCode : billingPostalCode}
              />
            </div>
          </fieldset>
          <EmailInput onChange={setEmail} />
          <PasswordInput onChange={setPassword} />
          <Button
            label="Continue"
            className="button button-login"
            onClick={(): void => console.log(body, shippingAddress, billingAddress)}
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};

export default Registration;
