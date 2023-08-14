import isEmailValid from '../../utils/validationFunctions/isEmailValid';
import CustomInput from '../CustomInput/CustomInput';

const EmailInput: React.FC = () => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Email is not valid"
      validator={isEmailValid}
      placeholder="Enter your email"
      type="text"
    />
  );
};

export default EmailInput;
