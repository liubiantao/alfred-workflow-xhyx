const alfy = require('alfy')
const FormData = require('form-data')

const form = new FormData()
form.append('search_word', alfy.input)

const rawData = await alfy.fetch(
  'http://www.xhup.club/Xhup/Search/searchCode',
  {
    method: 'POST',
    body: form,
    json: false
  }
)

const data = JSON.parse(rawData)

const getItems = () => {
  if (data.noResultCount > 0) {
    return [
      {
        title: `${alfy.input}：    未收录的字`,
        subtitle: '非《通用规范汉字表》国发〔2013〕23号文规定用字，故未收录',
        arg: alfy.input
      }
    ]
  } else if (data.list_dz.length > 0) {
    const list = data.list_dz[0]
    return [
      {
        title: list[0],
        arg: list[6]
      },
      {
        title: `拆　分：     ${list[1]}`,
        arg: list[6]
      },
      {
        title: `首　末：     ${list[2]}     ${list[3]}`,
        arg: list[6]
      },
      {
        title: `编　码：     ${list[4]}     ${list[5]}`,
        arg: list[6]
      }
    ]
  } else {
    return [
      {
        title: '请输入汉字',
        arg: alfy.input
      }
    ]
  }
}

alfy.output(getItems())
