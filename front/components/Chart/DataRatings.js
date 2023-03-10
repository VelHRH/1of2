export  const DataRatings = (st) => {
  let nOf5 = 0,
   nOf4 = 0,
   nOf3 = 0,
   nOf2 = 0,
   nOf1 = 0;
  for (let i of st) {
   if (i.stars === 5) nOf5++;
   if (i.stars === 4) nOf4++;
   if (i.stars === 3) nOf3++;
   if (i.stars === 2) nOf2++;
   if (i.stars === 1) nOf1++;
  }
  return [
   {
    avg:
     (nOf5 * 5 + nOf4 * 4 + nOf3 * 3 + nOf2 * 2 + nOf1 * 1) /
     (nOf5 + nOf4 + nOf3 + nOf2 + nOf1),
   },
   nOf1 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf1 },
   nOf2 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf2 },
   nOf3 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf3 },
   nOf4 !== 0 && { value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf4 },
   nOf5 !== 0 && {
    value: (100 / (nOf5 + nOf4 + nOf3 + nOf2 + nOf1)) * nOf5,
   },
  ];
 };