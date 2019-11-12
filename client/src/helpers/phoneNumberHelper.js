// eslint-disable-next-line no-useless-escape
export const getTelCode = phone => phone.match('\(\\+[0-9]{1,4}\)');

export const getPhoneNumber = phone => phone.split(')')[1];
