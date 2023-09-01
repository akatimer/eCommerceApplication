import {
  Address,
  ApiRoot,
  ClientResponse,
  Customer,
  MyCustomerChangeAddressAction,
  MyCustomerUpdateAction,
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
import './Profile.css';
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
  const [addressOnPage, setAddressesOnPage] = useState<ReactElement[]>();
  const [curretnId, setCurrentId] = useState('');
  const [edtitAdr, setEditAdr] = useState(false);
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

  const changeAdressAction: MyCustomerChangeAddressAction = {
    action: 'changeAddress',
    addressId: curretnId,
    address: {
      streetName: street,
      city: city,
      country: country,
      postalCode: postalCode,
    },
  };

  const changeUserFieldsActiom: MyCustomerUpdateAction[] = [
    { action: 'setFirstName', firstName: name },
    { action: 'setLastName', lastName: lastName },
    { action: 'setDateOfBirth', dateOfBirth: date },
    { action: 'changeEmail', email: email },
  ];

  const editMyProfile = (
    actions: MyCustomerUpdateAction[]
  ): Promise<void | ClientResponse<Customer>> => {
    const currentToken = localStorage.getItem(TOKEN_NAME);
    const newVersion = customerBody?.body.version;
    const apiTokenRoot = (): ApiRoot => {
      return createApiBuilderFromCtpClient(createClientWithToken(`Bearer ${currentToken}`));
    };
    const clientProfileResponse = apiTokenRoot()
      .withProjectKey({ projectKey })
      .me()
      .post({
        body: { version: newVersion, actions: actions },
      })
      .execute()
      .catch(console.error);
    return clientProfileResponse;
  };

  const handleButtonClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const storedValue = event.currentTarget.dataset.value;
    const currentProfile = await getMyProfile();
    if (storedValue) {
      setCurrentId(storedValue);
      setEditAdr(true);
      const currentAddress = currentProfile?.body.addresses.filter(
        (addr: Address) => addr.id === storedValue
      );
      if (currentAddress) {
        const shippingIds = currentProfile?.body.shippingAddressIds || [];
        setAddressType(shippingIds.includes(storedValue) ? 'Shipping' : 'Billing');
        setCountry(currentAddress[0].country);
        setCity(currentAddress[0].city || '');
        setStreet(currentAddress[0].streetName || '');
        setPostalCode(currentAddress[0].postalCode || '');
      }
    }
  };

  const createAdresses = (resp?: ClientResponse<Customer>): ReactElement[] | undefined => {
    const currentBody = resp ? resp : customerBody;
    if (currentBody) {
      const addr = currentBody.body.addresses.map((address: Address) => {
        return (
          <div className="address address-layout" key={address.id}>
            <div>Type: </div>
            <div>
              {currentBody.body.shippingAddressIds.includes(address.id) ? 'Shipping' : 'Billing'}
            </div>
            <div>Country: </div>
            <div>{address.country}</div>
            <div>City: </div>
            <div>{address.city}</div>
            <div>Street: </div>
            <div>{address.streetName}</div>
            <div>PostalCode: </div>
            <div>{address.postalCode}</div>
            <Button
              label="Edit Adr"
              className="button button-edit-adr"
              type="button"
              dataValue={address.id || ''}
              onClick={(event): void => {
                handleButtonClick(event);
                console.log(customerBody);
              }}
            />
          </div>
        );
      });
      setAddressesOnPage(addr);
      return addr;
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
          <EmailInput readOnlyValue={isReadOnly} onChange={setEmail} value={email} />
          {isReadOnly ? (
            <Button
              label="Edit"
              className="button button-edit"
              onClick={(): void => {
                setIsReadOnly(!isReadOnly);
                // checkProfileResponse();
              }}
              type="button"
            />
          ) : (
            <Button
              label="Update"
              className="button button-edit"
              onClick={(): void => {
                setIsReadOnly(!isReadOnly);
                editMyProfile(changeUserFieldsActiom).then(async (resp) => {
                  if (resp) {
                    const profileResponse = await getMyProfile();
                    if (profileResponse) {
                      setEmail(profileResponse.body.email);
                      setName(profileResponse.body.firstName || '');
                      setLastName(profileResponse.body.lastName || '');
                      setDate(profileResponse.body.dateOfBirth || '');
                      setCustomerBody(profileResponse);
                    }
                  }
                });
              }}
              type="button"
            />
          )}
          {edtitAdr && (
            <>
              <AddressComponent
                label="Edit Address"
                isReadOnly={false}
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
                  editMyProfile([changeAdressAction]).then((resp) => {
                    if (resp) {
                      createAdresses(resp);
                      setCustomerBody(resp);
                    }
                  });
                }}
                className="button button-save-update"
              />
            </>
          )}
          {addressOnPage ? addressOnPage : createAdresses()}
        </form>
      </div>
    </section>
  );
};

export default Profile;
