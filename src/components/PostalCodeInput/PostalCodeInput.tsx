import isPostalCodeValid from '../../utils/validationFunctions/isPostalCodeValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  value?: string;
  readOnlyValue?: boolean;
}

const PostalCodeInput: React.FC<InputProps> = ({ onChange, value, readOnlyValue }) => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your postal code in the correct format"
      validator={isPostalCodeValid}
      placeholder="Enter your postal code"
      type="text"
      onChange={onChange}
      value={value}
      readOnlyValue={readOnlyValue}
    />
  );
};

export default PostalCodeInput;
