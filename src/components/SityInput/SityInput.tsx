import isNameValid from '../../utils/validationFunctions/isNameValid';
import CustomInput from '../CustomInput/CustomInput';

const SityInput: React.FC = () => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Please enter your sity"
      validator={isNameValid}
      placeholder="Enter your sity"
      type="text"
    />
  );
};

export default SityInput;
