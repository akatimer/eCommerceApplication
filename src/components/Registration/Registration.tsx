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

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

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
              <CountrySelect onChange={setCountry} />
              <StreetInput onChange={setStreet} />
              <CityInput onChange={setCity} />
              <PostalCodeInput onChange={setPostalCode} />
              <div className="checkbox-wrapper">
                <Checkbox onChange={(): void => {}} label="Use as default" />
                <Checkbox onChange={(): void => {}} label="Use for billing" />
              </div>
            </div>
            <div className="bill-wrapper">
              <h2>Billing</h2>
              <CountrySelect onChange={setCountry} />
              <StreetInput onChange={setStreet} />
              <CityInput onChange={setCity} />
              <PostalCodeInput onChange={setPostalCode} />
            </div>
          </fieldset>
          <EmailInput onChange={setEmail} />
          <PasswordInput onChange={setPassword} />
          <Button
            label="Continue"
            className="button-login"
            onClick={(): void => {
              console.log(name, lastName, email, password, date, street, city, country, postalCode);
            }}
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};
export default Registration;
