import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
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
import { useAuth } from '../AuthUse/AuthUse';
import {
  AddressDraft,
  ApiRoot,
  ClientResponse,
  CustomerDraft,
  CustomerSignInResult,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { createCustomer } from '../../utils/api/clientApi';
import isEmailValid from '../../utils/validationFunctions/isEmailValid';
import isPasswordValid from '../../utils/validationFunctions/isPasswordValid';
import isDateValid from '../../utils/validationFunctions/isDateValid';
import isNameValid from '../../utils/validationFunctions/isNameValid';
import isPostalCodeValid from '../../utils/validationFunctions/isPostalCodeValid';
import isStreetValid from '../../utils/validationFunctions/isStreetValid';
import { createClientWithPass, projectKey } from '../../utils/api/clientBuilder';
import { HOME_ROUTE, TOKEN_NAME } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/constants';
import { NavLink } from 'react-router-dom';

const Registration: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [shippingStreet, setShippingStreet] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingCountry, setShippingCountry] = useState('US');
  const [shippingPostalCode, setShippingPostalCode] = useState('');
  const [billingStreet, setBillingStreet] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingCountry, setBillingCountry] = useState('US');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [useShippingForBilling, setUseShippingForBilling] = useState(false);
  const [useAsDefault, setUseAsDefault] = useState(false);
  const [token, setToken] = useState('');

  const [isDataValid, setIsDataValid] = useState(false);

  const [isModalShown, setIsModalShown] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(HOME_ROUTE);
    }
    const storageToken = localStorage.getItem(TOKEN_NAME);
    if (storageToken) {
      setToken(storageToken);
    }
    if (!useShippingForBilling) {
      if (
        isEmailValid(email) &&
        isPasswordValid(password) &&
        isDateValid(date) &&
        isNameValid(name) &&
        isNameValid(lastName) &&
        isNameValid(shippingCity) &&
        isNameValid(billingCity) &&
        isPostalCodeValid(shippingPostalCode) &&
        isPostalCodeValid(billingPostalCode) &&
        isStreetValid(shippingStreet) &&
        isStreetValid(billingStreet)
      ) {
        setIsDataValid(true);
      } else {
        setIsDataValid(false);
      }
    } else {
      if (
        isEmailValid(email) &&
        isPasswordValid(password) &&
        isDateValid(date) &&
        isNameValid(name) &&
        isNameValid(lastName) &&
        isNameValid(shippingCity) &&
        isPostalCodeValid(shippingPostalCode) &&
        isStreetValid(shippingStreet)
      ) {
        setIsDataValid(true);
      } else {
        setIsDataValid(false);
      }
    }
  }, [
    billingCity,
    billingPostalCode,
    billingStreet,
    date,
    email,
    isDataValid,
    isLoggedIn,
    lastName,
    name,
    navigate,
    password,
    shippingCity,
    shippingCountry,
    shippingPostalCode,
    shippingStreet,
    token,
    useShippingForBilling,
  ]);

  const shippingAddress: AddressDraft = {
    streetName: shippingStreet,
    city: shippingCity,
    country: shippingCountry,
    postalCode: shippingPostalCode,
  };

  const billingAddress: AddressDraft = {
    streetName: billingStreet,
    city: billingCity,
    country: billingCountry,
    postalCode: billingPostalCode,
  };

  const handleBillingCheckbox = (): void => {
    setUseShippingForBilling((prev) => !prev);
  };

  const createLogin = (): void => {
    const ApiPassRoot: () => ApiRoot = () => {
      return createApiBuilderFromCtpClient(createClientWithPass(email, password));
    };
    ApiPassRoot()
      .withProjectKey({ projectKey })
      .login()
      .post({ body: { email: email, password: password } })
      .execute();
    setIsLoggedIn(true);
    localStorage.setItem('wichers_login', 'true');
    navigate(HOME_ROUTE);
  };

  const createBody = (): CustomerDraft => {
    const addresses = useShippingForBilling
      ? [{ ...shippingAddress }, { ...shippingAddress }]
      : [{ ...shippingAddress }, { ...billingAddress }];
    const defaultAddress = useAsDefault ? { defaultShippingAddress: 0 } : {};
    const billingAddressNumbers = { billingAddresses: [0] };
    const shippingAddressNumbers = { shippingAddresses: [1] };
    const body = {
      email: email,
      password: password,
      dateOfBirth: date,
      firstName: name,
      lastName: lastName,
      addresses: addresses,
      ...defaultAddress,
      ...billingAddressNumbers,
      ...shippingAddressNumbers,
    };
    return body;
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
                <Checkbox
                  onChange={(): void => setUseAsDefault((prev) => !prev)}
                  label="Use as default"
                />
                <Checkbox onChange={handleBillingCheckbox} label="Use for billing" />
              </div>
            </div>
            {!useShippingForBilling && (
              <div className="bill-wrapper">
                <h2>Billing</h2>
                <CountrySelect onChange={setBillingCountry} value={billingCountry} />
                <StreetInput onChange={setBillingStreet} value={billingStreet} />
                <CityInput onChange={setBillingCity} value={billingCity} />
                <PostalCodeInput onChange={setBillingPostalCode} value={billingPostalCode} />
              </div>
            )}
          </fieldset>
          <EmailInput onChange={setEmail} />
          <PasswordInput onChange={setPassword} />
          <Button
            label="Continue"
            className="button button-login"
            onClick={(): Promise<void | ClientResponse<CustomerSignInResult>> =>
              createCustomer(createBody()).then((response) => {
                if (response) {
                  setIsModalShown(false);
                  createLogin();
                } else {
                  setIsModalShown(true);
                }
              })
            }
            type="submit"
            disabled={!isDataValid}
          />
        </form>
        <p className="to-route-desc">
          Сreate an account or&nbsp;
          <NavLink to={LOGIN_ROUTE} className="to-route-link">
            log in
          </NavLink>
        </p>
      </div>
      {isModalShown && (
        <Alert
          severity="error"
          className="modal"
          onClose={(): void => {
            setIsModalShown(false);
          }}
        >
          User with this email already exists
        </Alert>
      )}
    </section>
  );
};

export default Registration;
