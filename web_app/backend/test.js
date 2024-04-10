import fs from "fs";

function anagram(word) {
  let result = "";

  for (let i = word.length - 1; i >= 0; i--) {
    result += word[i];
  }
  return result;
}

function count(path) {
  fs.readFile(path, "utf8", (err, data) => {
    let result = {};

    for (let i = 0; i < data.length; i++) {
      const lether = data[i];

      if (Object.hasOwn(result, lether)) {
        result[lether] = result[lether] + 1;
      } else {
        result[lether] = 1;
      }
    }

    console.log(result);
  });
}

count("test.txt");
