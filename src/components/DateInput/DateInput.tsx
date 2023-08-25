import isDateValid from '../../utils/validationFunctions/isDateValid';
import CustomInput from '../CustomInput/CustomInput';

interface InputProps {
  onChange: (value: string) => void;
  readOnlyValue?: boolean;
}

const DateInput: React.FC<InputProps> = ({ onChange, readOnlyValue }) => {
  return (
    <CustomInput
      validColor="#00A000"
      invalidColor="#FF0000"
      validMessage="Thank you"
      invalidMessage="Sorry. You must be over 13 years old"
      validator={isDateValid}
      placeholder="Your date of birth"
      type="date"
      onChange={onChange}
      readOnlyValue={readOnlyValue}
    />
  );
};

export default DateInput;
