const prayers = require("../prayers/english/prayers.json");
const fs = require("fs");

function main() {
  const data = prayers.map((text, idx) => {
    let name = `Prayer ${idx}`;
    if (idx === 0) name = "Tenets Of Prayer";
    if (idx === prayers.length - 1) name = "Colophon";
    return {
      id: String(idx + 1),
      name,
      text: text,
    };
  });

  const jsonData = JSON.stringify(data);
  fs.writeFileSync("narek.json", jsonData);
}

main();
