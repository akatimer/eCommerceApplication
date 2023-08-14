import isStreetValid from '../../utils/validationFunctions/isStreetValid';
import CustomInput from '../CustomInput/CustomInput';

const StreetInput: React.FC = () => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your street"
      validator={isStreetValid}
      placeholder="Enter your street"
      type="text"
    />
  );
};

export default StreetInput;
