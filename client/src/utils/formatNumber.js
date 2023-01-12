const formatNumber = (num) => {
  if (num < 1000) {
    return num.toString();
  }
  let res = [];
  let remainder = num;
  let count = 0;
  while (remainder > 0) {
    if (count === 3) {
      res.unshift(",");
      count = 0;
      continue;
    }
    res.unshift((remainder % 10).toString());
    count += 1;
    remainder = Math.floor(remainder / 10);
  }
  return res.join("");
};

export default formatNumber;
