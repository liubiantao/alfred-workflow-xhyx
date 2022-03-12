import alfy from "alfy";
import xhyx from "./xhyx.json";
import fontCodeMap from "./font-code-map.json";

const input = String(alfy.input)
const data = xhyx[input];
const fontCode = fontCodeMap[input]

const getItems = () => {
  if (data === "未收录") {
    return [
      {
        title: `${input}：    未收录的字`,
        subtitle: "非《通用规范汉字表》国发〔2013〕23号文规定用字，故未收录",
        arg: input
      }
    ];
  } else if (data && data.length > 0) {
    return [
      {
        title: data[0],
        arg: input
      },
      {
        title: `拆　分：     ${data[1]}`,
        arg: input
      },
      {
        title: `首　末：     ${data[2]}     ${data[3]}`,
        arg: input
      },
      {
        title: `编　码：     ${data[4]}     ${data[5]}`,
        arg: input
      }
    ];
  } else {

    if (fontCode) {
      const code = fontCode.split(',');
      return [{
        title: `编码：${code[0]}`,
        arg: input
      },
      {
        title: `位置：${code[1]}`,
        arg: input
      },
      ]
    }

    return [
      {
        title: "查询错误",
        arg: input
      }
    ];
  }
};

alfy.output(getItems());
