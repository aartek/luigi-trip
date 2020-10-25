import LuigiClient from '@luigi-project/client'
import "./scss/main.scss"

window.onload = () => {
  document.getElementById('auto-login').checked = JSON.parse(window.localStorage.getItem('auto-login'))
}

window.changeAutoLogin = function () {
  window.localStorage.setItem('auto-login', document.getElementById('auto-login').checked)
}

window.back = function () {
  LuigiClient.linkManager().goBack()
}

