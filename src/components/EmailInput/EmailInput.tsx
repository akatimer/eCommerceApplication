import isEmailValid from '../../utils/validationFunctions/isEmailValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  readOnlyValue?: boolean;
  value?: string;
}

const EmailInput: React.FC<InputProps> = ({ onChange, readOnlyValue, value }) => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Email is not valid"
      validator={isEmailValid}
      placeholder="Enter your email"
      type="text"
      onChange={onChange}
      readOnlyValue={readOnlyValue}
      value={value}
    />
  );
};

export default EmailInput;
