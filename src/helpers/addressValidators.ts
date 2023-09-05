export const validateCity = {
  required: `City is required`,
  pattern: {
    value: /^[a-zA-Z\s]+$/,
    message: `City must contain at least one letter`,
  },
};
export const validateStreet = {
  required: `Street is required`,
  pattern: {
    value: /^\S(.*\S)?$/,
    message: 'Street must contain at least one character',
  },
};
export const validateStreetNumber = {
  required: `Number is required`,
  pattern: {
    value: /^.+$/,
    message: 'Must contain at least one character',
  },
};
export const validatePostalCode = (countryCode: string, value: string) => {
  console.log(countryCode, 'countryCode');

  const message = 'Invalid ZIP code format, the correct format is';
  let errorMessage: string | undefined;
  let pattern;
  switch (countryCode) {
    case 'Canada':
      pattern = /^[A-Z][0-9][A-Z] [0-9][A-Z][0-9]$/;
      errorMessage = pattern.test(value) ? undefined : `${message} "A1A 1A1" `;
      break;
    case 'United States':
      pattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
      errorMessage = pattern.test(value) ? undefined : `${message} "12345" or "12345-1234"`;
      break;
    case 'Germany':
      pattern = /^\d{5}$/;
      errorMessage = pattern.test(value) ? undefined : `${message} "12345" `;
      break;
    case 'France':
      pattern = /^\d{5}$/;
      errorMessage = pattern.test(value) ? undefined : `${message} "12345" `;
      break;
    default:
      errorMessage = "Didn't choose a country";
  }
  return errorMessage || true;
};
