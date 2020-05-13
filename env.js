const env = {}

if (process.env.NODE_ENV === 'production') {
  env.NODE_ENV = '"production"'
  env.SSO_HOST = '"https://login2.xiaohongshu.com"'
  env.VUE_APP_LOGIN_SERVICE = '"https://david.devops.xiaohongshu.com/#/signin"'
} else {
  env.NODE_ENV = '"development"'
  env.SSO_HOST = '"https://login2.xiaohongshu.com"'
  env.VUE_APP_LOGIN_SERVICE = '"http://localhost:9999/#/signin"'
}

export default env
