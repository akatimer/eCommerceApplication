import React from 'react';
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
  return (
    <section className="form form-reg">
      <div className="form-wrapper">
        <form className="auth-form reg-form" onSubmit={(e): void => e.preventDefault()}>
          <h1 className="form-title">Sign up</h1>
          <NameInput />
          <LastNameInput />
          <DateInput />
          <fieldset className="address">
            <legend>Address</legend>
            <div className="shipp-wrapper">
              <h2>Shipping</h2>
              <CountrySelect />
              <StreetInput />
              <CityInput />
              <PostalCodeInput />
              <div className="checkbox-wrapper">
                <Checkbox onChange={(): void => {}} label="Use as default" />
                <Checkbox onChange={(): void => {}} label="Use for billing" />
              </div>
            </div>
            <div className="bill-wrapper">
              <h2>Billing</h2>
              <CountrySelect />
              <StreetInput />
              <CityInput />
              <PostalCodeInput />
            </div>
          </fieldset>
          <EmailInput />
          <PasswordInput />
          <Button
            label="Continue"
            className="button-login"
            onClick={(): void => {}}
            type="submit"
          />
        </form>
      </div>
    </section>
  );
};
export default Registration;
