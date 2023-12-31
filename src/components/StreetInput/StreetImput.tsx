import isStreetValid from '../../utils/validationFunctions/isStreetValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  value?: string;
  readOnlyValue?: boolean;
}

const StreetInput: React.FC<InputProps> = ({ onChange, value, readOnlyValue }) => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your street"
      validator={isStreetValid}
      placeholder="Enter your street"
      type="text"
      value={value}
      onChange={onChange}
      readOnlyValue={readOnlyValue}
    />
  );
};

export default StreetInput;
