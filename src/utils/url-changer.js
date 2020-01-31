import history from '../routes/history';

/**
 * Rotate the given Char by 13 places
 */
const rot13 = (str) => {
  const input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  const output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';

  const index     = (x) => input.indexOf(x);

  const translate = (x) => index(x) > -1 ? output[index(x)] : x;

  return str.split('').map(translate).join('');
}

/**
 * Adds Padding to the Base64 String so that decode doesn't miss any characters
 */
const base64AddPadding = (str) => str + Array((4 - str.length % 4) % 4 + 1).join('=');

/**
 * Removes Padding from the Base64 string to save space
 */
const base64RemovePadding = (str) => str.replace(/={1,2}$/, '');

const encode = (data) => rot13(base64RemovePadding(btoa(JSON.stringify(data))));

const decode = (data) => {
  if (!data) {
    return '';
  }

  try {
    return JSON.parse(atob(base64AddPadding(rot13((data)))));
  } catch {
    history.push(`/`);

    return {};
  }
};

const urlChanger = {
  encode,
  decode
};

export default urlChanger;
