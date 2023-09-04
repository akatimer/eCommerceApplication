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
import { HOME_ROUTE, LOGIN_ROUTE, TOKEN_NAME } from '../../utils/constants';
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
import PasswordInput from '../PasswordInput/PasswordInput';
import CustModal from '../Modal/CustModal';

const Profile: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('US');
  const [postalCode, setPostalCode] = useState('');
  // const [addressType, setAddressType] = useState('Shipping');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [customerBody, setCustomerBody] = useState<ClientResponse | null>(null);
  const [addressOnPage, setAddressesOnPage] = useState<ReactElement[]>();
  const [curretnId, setCurrentId] = useState('');
  const [isEditAdr, setIsEditAdr] = useState(false);
  const [isChangePass, setIsChangePass] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isAddAdrFormShown, setIsAddAdrFormShown] = useState(false);
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

  const changeUserFieldsAction: MyCustomerUpdateAction[] = [
    { action: 'setFirstName', firstName: name },
    { action: 'setLastName', lastName: lastName },
    { action: 'setDateOfBirth', dateOfBirth: date },
    { action: 'changeEmail', email: email },
  ];

  // useEffect(() => {
  //   createAdresses();
  // }, [createAdresses]);

  const editMyProfile = async (
    actions: MyCustomerUpdateAction[]
  ): Promise<void | ClientResponse<Customer>> => {
    const currentToken = localStorage.getItem(TOKEN_NAME);
    const currentProfile = await getMyProfile();
    const newVersion = currentProfile?.body.version;
    const apiTokenRoot = (): ApiRoot => {
      return createApiBuilderFromCtpClient(createClientWithToken(`Bearer ${currentToken}`));
    };
    if (newVersion) {
      const clientProfileResponse = apiTokenRoot()
        .withProjectKey({ projectKey })
        .me()
        .post({
          body: { version: newVersion, actions: actions },
        })
        .execute()
        .catch(console.error);
      return clientProfileResponse;
    }
  };

  const handleButtonEditClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const storedValue = event.currentTarget.dataset.value;
    const currentProfile = await getMyProfile();
    if (storedValue) {
      setCurrentId(storedValue);
      setIsEditAdr(true);
      const currentAddress = currentProfile?.body.addresses.filter(
        (addr: Address) => addr.id === storedValue
      );
      if (currentAddress) {
        // const shippingIds = currentProfile?.body.shippingAddressIds || [];
        // setAddressType(shippingIds.includes(storedValue) ? 'Shipping' : 'Billing');
        setCountry(currentAddress[0].country);
        setCity(currentAddress[0].city || '');
        setStreet(currentAddress[0].streetName || '');
        setPostalCode(currentAddress[0].postalCode || '');
      }
    }
  };

  const handleButtonDeleteClick = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    const storedValue = event.currentTarget.dataset.value;
    await editMyProfile([{ action: 'removeAddress', addressId: storedValue }]).then((resp) => {
      if (resp) {
        createAdresses(resp);
        setCustomerBody(resp);
      }
    });
  };

  const changeMyPassword = (): Promise<void | ClientResponse<Customer>> => {
    const currentToken = localStorage.getItem(TOKEN_NAME);
    const newVersion = customerBody?.body.version;
    const apiTokenRoot = (): ApiRoot => {
      return createApiBuilderFromCtpClient(createClientWithToken(`Bearer ${currentToken}`));
    };
    const clientProfileResponse = apiTokenRoot()
      .withProjectKey({ projectKey })
      .me()
      .password()
      .post({
        body: { version: newVersion, currentPassword: password, newPassword: newPassword },
      })
      .execute()
      .catch(console.error);
    return clientProfileResponse;
  };

  const createAdresses = (resp?: ClientResponse<Customer>): ReactElement[] | undefined => {
    const currentBody = resp ? resp : customerBody;
    if (currentBody) {
      const addr = currentBody.body.addresses.map((address: Address) => {
        return (
          <div className="address address-layout address-profile" key={address.id}>
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
              label="Edit Address"
              className="button button-edit-adr"
              type="button"
              dataValue={address.id || ''}
              onClick={(event): void => {
                handleButtonEditClick(event);
              }}
            />
            <Button
              label="Delete Address"
              className="button button-edit-adr"
              type="button"
              dataValue={address.id || ''}
              onClick={(event): void => {
                setIsEditAdr(false);
                handleButtonDeleteClick(event);
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
    <section className="form form-reg profile">
      <div className="form-wrapper">
        <form className="auth-form reg-form" onSubmit={(e): void => e.preventDefault()}>
          <h1 className="form-title">Your Profile</h1>
          <NameInput readOnlyValue={isReadOnly} onChange={setName} value={name} />
          <LastNameInput readOnlyValue={isReadOnly} onChange={setLastName} value={lastName} />
          <DateInput readOnlyValue={isReadOnly} onChange={setDate} value={date} />
          <EmailInput readOnlyValue={isReadOnly} onChange={setEmail} value={email} />
          {isReadOnly ? (
            <Button
              label="Edit name DOB e-mail"
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
                editMyProfile(changeUserFieldsAction).then(async (resp) => {
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
          {isAddAdrFormShown ? (
            <Button
              label="Cancel Adding"
              className="button button-edit"
              onClick={(): void => {
                setIsAddAdrFormShown(false);
              }}
              type="button"
            />
          ) : (
            <Button
              label="Add Address"
              className="button button-edit"
              onClick={(): void => {
                setIsAddAdrFormShown(true);
              }}
              type="button"
            />
          )}
          {isAddAdrFormShown && (
            <>
              <AddressComponent
                label="Add Address"
                isReadOnly={false}
                // typeValue={addressType}
                countryValue={country}
                cityValue={city}
                streetValue={street}
                postalCodeValue={postalCode}
                // setAdressType={setAddressType}
                setCountry={setCountry}
                setCity={setCity}
                setStreet={setStreet}
                setPostalCode={setPostalCode}
              />
              <Button
                label="Save & Update"
                onClick={(): void => {
                  editMyProfile([
                    {
                      action: 'addAddress',
                      address: {
                        streetName: street,
                        city: city,
                        country: country,
                        postalCode: postalCode,
                      },
                    },
                  ]).then((resp) => {
                    if (resp) {
                      createAdresses(resp);
                      setCustomerBody(resp);
                    }
                  });
                  setIsAddAdrFormShown(false);
                }}
                className="button button-save-update"
              />
            </>
          )}
          {isEditAdr && (
            <>
              <AddressComponent
                label="Edit Address"
                isReadOnly={false}
                // typeValue={addressType}
                countryValue={country}
                cityValue={city}
                streetValue={street}
                postalCodeValue={postalCode}
                // setAdressType={setAddressType}
                setCountry={setCountry}
                setCity={setCity}
                setStreet={setStreet}
                setPostalCode={setPostalCode}
              />
              <Button
                label="Save & Update"
                onClick={(): void => {
                  setIsEditAdr(false);
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
          <Button
            label="Change Password"
            onClick={(): void => {
              setIsChangePass(true);
            }}
            className="button button-save-update"
          />
          {isChangePass && (
            <>
              <PasswordInput onChange={setPassword} />
              <PasswordInput onChange={setNewPassword} placeholder="Enter new password" />
              <Button
                label="Update"
                className="button button-edit"
                onClick={(): void => {
                  changeMyPassword().then((resp) => {
                    console.log(resp);
                    if (resp) {
                      localStorage.removeItem(TOKEN_NAME);
                      setLoggedOut(true);
                      navigate(LOGIN_ROUTE);
                    } else {
                      setIsModal(true);
                    }
                  });
                }}
              />
            </>
          )}
          {isModal && (
            <CustModal
              title="You Entered Wrong Password"
              onClick={(): void => {
                setIsModal(false);
              }}
            />
          )}
        </form>
      </div>
    </section>
  );
};

export default Profile;
