export function facebookSdk(appId, version) {
  return new Promise(resolve => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId,
        xfbml: false,
        version,
        cookie: true
      })
      window.FB.AppEvents.logPageView()
      resolve('SDK Loaded!')
    }
    ;(function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      const js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  })
}

export function getLoginStatus() {
  return new Promise(resolve => {
    window.FB.getLoginStatus(responseStatus => {
      resolve(responseStatus)
    })
  })
}

export function fbLogin(options) {
  return new Promise(resolve => {
    window.FB.login(response => resolve(response), options)
  })
}
export function fbLogout() {
  return new Promise(resolve => {
    window.FB.logout(response => resolve(response))
  })
}

export async function userInfo() {
  return new Promise(resolve => {
    window.FB.api('/me', response => resolve(response))
  })
}
