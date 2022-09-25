function resolveData(obj) {
  let arr = []
  for (let key in obj) {
    arr.push(`${key}=${obj[key]}`)
  }
  return arr.join('&')
}
// console.log(resolveData({id:1,name:'小明'}))


function myAjax({ method, url, data, success }) {
  let xhr = new XMLHttpRequest()
  method = method.toLowerCase()
  switch (method) {
    case 'get':
      xhr.open(method, `${url}?${resolveData(data)}`)
      xhr.send()
      break
    case 'post':
      xhr.open(method,url)
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      xhr.send( resolveData(data))
      break
    default:
      break
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      let result = JSON.parse(xhr.responseText)
      success(result)

    }
  }
}