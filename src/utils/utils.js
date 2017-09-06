
export function parseMakeKeySameAsId(response) {
  var parsedObject = {};
  Object.keys(response).map((key) => {
    const _id = response[key]._id;
    parsedObject[_id] = response[key];
  });
  return parsedObject;
}

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomColor() {
  var r = getRandomInt(0, 255) + 20;
  var g = getRandomInt(0, 255) - 20;
  var b = getRandomInt(0, 255) + 20;

  return "rgb(" + r + "," + g + "," + b + ")";
}
