export const AUTH_SET_TOKEN = 'auth/SET_TOKEN'
export const AUTH_DISCARD_TOKEN = 'auth/DISCARD_TOKEN'
export const AUTH_SET_USER = 'auth/SET_USER'

export function authSetToken(token){
  return {
    type: AUTH_SET_TOKEN,
    token
  };
}

export function authDiscardToken(){
  return {
    type: AUTH_DISCARD_TOKEN
  };
}

export function authSetUser(user){
  return {
    type: AUTH_SET_USER,
    user
  };
}
