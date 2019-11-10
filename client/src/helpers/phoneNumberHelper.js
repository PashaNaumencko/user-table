export const getTelCode = phone => phone.match('\(\\+[1-9]{1,4}\)')[0];

export const getPhoneNumber = phone => phone.split(')')[1];
