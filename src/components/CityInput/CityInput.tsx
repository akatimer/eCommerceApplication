import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  value?: string;
  readOnlyValue?: boolean;
}

const CityInput: React.FC<InputProps> = ({ onChange, value, readOnlyValue }) => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your city"
      validator={isNameValid}
      placeholder="Enter your city"
      type="text"
      onChange={onChange}
      value={value}
      readOnlyValue={readOnlyValue}
    />
  );
};

export default CityInput;
