import { nameMaxChars } from '../constants/values';

export const isEthPhone = (val) => {
  try {
    // Create a copy of val to prevent changing the original object
    let number = JSON.parse(JSON.stringify(val));
    // Remove all white space
    number = number.replace(/\s/g, '');
    // Remove leading '+' if it exists
    if (number[0] === '+') {
      number = number.substring(1);
    }
    // Ensure remaining string is numeric and validate
    if (''.match(/^[0-9]*$/g)) {
      const length = number.length;
      if (
        (length === 12 && number.startsWith('251')) ||
        (length === 10 && number.startsWith('0')) ||
        length === 9
      ) {
        return true;
      }
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const name = (name = 'Name') => {
  return (val) => {
    let value = JSON.parse(JSON.stringify(val));
    value = value.replace(/\s/g, '');

    if (value.length <= 0) {
      return `${name} cannot be empty`;
    }

    if (value.length > nameMaxChars) {
      return `${name} cannot be more than ${nameMaxChars} characters`;
    }

    return true;
  };
};

export const required = (field = 'Field') => {
  return (val) => !!val || `${field} is required`;
};

export const ethPhone = (val) =>
  isEthPhone(val) || 'Invalid Ethiopian phone number';
