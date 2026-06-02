const TOKEN_KEY = 'admin-token'

function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}

function setToken(token) {
  return localStorage.setItem(TOKEN_KEY, token)
}

function removeToken() {
  return localStorage.removeItem(TOKEN_KEY)
}

export { getToken, setToken, removeToken }
