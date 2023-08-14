import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

const CityInput: React.FC = () => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your city"
      validator={isNameValid}
      placeholder="Enter your city"
      type="text"
    />
  );
};

export default CityInput;
