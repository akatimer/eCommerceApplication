import {
  Address,
  ApiRoot,
  ClientResponse,
  Customer,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { useNavigate } from 'react-router-dom';
import { HOME_ROUTE, TOKEN_NAME } from '../../utils/constants';
import DateInput from '../DateInput/DateInput';
import EmailInput from '../EmailInput/EmailInput';
import LastNameInput from '../LastNameInput/LastNameInput';
import NameInput from '../NameInput/NameInput';
import { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../AuthUse/AuthUse';
import { createClientWithToken, projectKey } from '../../utils/api/clientBuilder';
import Button from '../Button/Button';
import './profile.css';
import AddressComponent from '../AddressComponent/AddressComponent';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('US');
  const [postalCode, setPostalCode] = useState('');
  const [addressType, setAddressType] = useState('Shipping');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [customerBody, setCustomerBody] = useState<ClientResponse | null>(null);
  const { setLoggedOut } = useAuth();
  const navigate = useNavigate();

  const getMyProfile = (): Promise<void | ClientResponse<Customer>> | undefined => {
    const currentToken = localStorage.getItem(TOKEN_NAME);
    if (currentToken) {
      const apiTokenRoot = (): ApiRoot => {
        return createApiBuilderFromCtpClient(createClientWithToken(`Bearer ${currentToken}`));
      };
      const clientProfileResponse = apiTokenRoot()
        .withProjectKey({ projectKey })
        .me()
        .get()
        .execute()
        .catch(console.error);
      return clientProfileResponse;
    }
  };

  const [curretnId, setCurrentId] = useState('');
  const [edtitAdr, setEditAdr] = useState(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    const storedValue = event.currentTarget.dataset.value;
    if (storedValue) {
      setCurrentId(storedValue);
      setEditAdr(true);
    }
  };

  const createAdresses = (): ReactElement[] | undefined => {
    if (customerBody) {
      // console.log(customerBody.body);
      // setAddresses(customerBody.body.addresses);
      return customerBody.body.addresses.map((address: Address) => {
        return (
          <div key={address.id}>
            <div>Type</div>
            <div>
              {customerBody.body.shippingAddressIds.includes(address.id) ? addressType : 'Billing'}
            </div>
            <div>Country</div>
            <div>{address.country}</div>
            <div>Street</div>
            <div>{address.streetName}</div>
            <div>PostalCode</div>
            <div>{address.postalCode}</div>
            <Button
              label="Edit Adr"
              className="button"
              type="button"
              dataValue={address.id || ''}
              onClick={handleButtonClick}
            />
          </div>
        );
      });
    }
  };

  useEffect(() => {
    (async (): Promise<void> => {
      const profileResponse = await getMyProfile();
      if (profileResponse) {
        setEmail(profileResponse.body.email);
        setName(profileResponse.body.firstName || '');
        setLastName(profileResponse.body.lastName || '');
        setDate(profileResponse.body.dateOfBirth || '');
        setCustomerBody(profileResponse);
      } else {
        localStorage.removeItem(TOKEN_NAME);
        setLoggedOut(true);
        navigate(HOME_ROUTE);
      }
    })();
  }, [navigate, setLoggedOut]);

  return (
    <section className="form form-reg">
      <div className="form-wrapper">
        <form className="auth-form reg-form" onSubmit={(e): void => e.preventDefault()}>
          <h1 className="form-title">Your Profile</h1>
          <NameInput readOnlyValue={isReadOnly} onChange={setName} value={name} />
          <LastNameInput readOnlyValue={isReadOnly} onChange={setLastName} value={lastName} />
          <DateInput readOnlyValue={isReadOnly} onChange={setDate} value={date} />
          {edtitAdr && (
            <>
              <AddressComponent
                isReadOnly={isReadOnly}
                typeValue={addressType}
                countryValue={country}
                cityValue={city}
                streetValue={street}
                postalCodeValue={postalCode}
                setAdressType={setAddressType}
                setCountry={setCountry}
                setCity={setCity}
                setStreet={setStreet}
                setPostalCode={setPostalCode}
              />
              <Button
                label="Save & Update"
                onClick={(): void => {
                  setEditAdr(false);
                  console.log(curretnId);
                }}
                className="button"
              />
            </>
          )}
          {createAdresses()}
          <EmailInput readOnlyValue={isReadOnly} onChange={setEmail} value={email} />
          <Button
            label="Edit"
            className="button button-edit"
            onClick={(): void => {
              setIsReadOnly(!isReadOnly);
              console.log(createAdresses());
              // checkProfileResponse();
            }}
            type="button"
          />
        </form>
      </div>
    </section>
  );
};

export default Profile;
