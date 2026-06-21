const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
function randomStr(min, max) {
  const length = rand(min, max)
  return Array.from({ length: length }, () => chars[rand(0, chars.length - 1)]).join('')
}

const cityList = ['上海市', '北京市', '武汉市', '天津市', '深圳市', '新疆']
function randomCity() {
  return cityList[rand(0, cityList.length - 1)]
}

const browserList = ['Chrome', 'Edge', 'Firefox', 'Safari']
const deviceList = ['Windows', 'macOS', 'Linux', 'Android', 'iOS']
function randomDevice() {
  return (
    browserList[rand(0, browserList.length - 1)] + '/' + deviceList[rand(0, deviceList.length - 1)]
  )
}

function randomDateTime() {
  return `2026-05-${String(rand(1, 31)).padStart(2, '0')}
  ${String(rand(0, 23)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}:
  ${String(rand(0, 59)).padStart(2, '0')}`
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const loginList = Array.from({ length: 8 }, (_, i) => ({
  log_id: `9999${String(i + 1).padStart(6, '0')}`,
  create_time: randomDateTime(),
  login_adress: randomCity(),
  ip: `192.168.1.${rand(1, 254)}`,
  device: randomDevice(),
  status: Math.random() > 0.2 ? 1 : 0,
}))

export default [
  {
    url: '/api/profileLogin/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: {
          list: loginList,
          total: loginList.length,
        },
      }
    },
  },
]
