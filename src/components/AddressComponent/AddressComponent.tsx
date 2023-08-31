import AdressTypeSelect from '../AdressTypeSelect/AdressTypeSelect';
import CityInput from '../CityInput/CityInput';
import CountrySelect from '../CountrySelect/CountrySelect';
import PostalCodeInput from '../PostalCodeInput/PostalCodeInput';
import StreetInput from '../StreetInput/StreetImput';

interface IAdressProps {
  label: string;
  isReadOnly: boolean;
  typeValue: string;
  countryValue: string;
  streetValue: string;
  cityValue: string;
  postalCodeValue: string;
  setAdressType: (country: string) => void;
  setCountry: (country: string) => void;
  setStreet: (country: string) => void;
  setCity: (country: string) => void;
  setPostalCode: (country: string) => void;
}

const AddressComponent: React.FC<IAdressProps> = ({
  label,
  isReadOnly,
  typeValue,
  countryValue,
  streetValue,
  cityValue,
  postalCodeValue,
  setAdressType,
  setCountry,
  setStreet,
  setCity,
  setPostalCode,
}) => {
  return (
    <fieldset className="address">
      <legend>{label}</legend>
      <div className="shipp-wrapper">
        <AdressTypeSelect readOnlyValue={isReadOnly} onChange={setAdressType} value={typeValue} />
        <CountrySelect readOnlyValue={isReadOnly} onChange={setCountry} value={countryValue} />
        <StreetInput readOnlyValue={isReadOnly} onChange={setStreet} value={streetValue} />
        <CityInput readOnlyValue={isReadOnly} onChange={setCity} value={cityValue} />
        <PostalCodeInput
          readOnlyValue={isReadOnly}
          onChange={setPostalCode}
          value={postalCodeValue}
        />
      </div>
    </fieldset>
  );
};

export default AddressComponent;
