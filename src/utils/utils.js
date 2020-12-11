const splitIntoTriplets = (arr) => {
  let result = [];
  let triplet = [];
  arr.forEach((element, index, array) => {
    if ((index + 1) % 3 === 0 || (index + 1) === array.length) {
      triplet.push(element);
      result.push(triplet);
      triplet = [];
    } else {
      triplet.push(element);
    }
  });
  return result;
};

export { splitIntoTriplets };
