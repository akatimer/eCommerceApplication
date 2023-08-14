import isDateValid from '../../utils/validationFunctions/isDateValid';
import CustomInput from '../CustomInput/CustomInput';

const DateInput: React.FC = () => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Sorry. You must be over 13 years old"
      validator={isDateValid}
      placeholder="Your date of birth"
      type="date"
    />
  );
};

export default DateInput;
