// Promise.allSettledでの実装
const computeSum = async (numArray) => {
  let sum = 0;
  const array = await Promise.allSettled(numArray);
  for (const e of array) {
    if (e.status === 'fulfilled') sum += e.value;
  }
  return sum;
};

computeSum(
  [1, 2, 3, 4].map((e) =>
    e % 2 === 0 ? Promise.resolve(e) : Promise.reject(new Error('Error!!'))
  )
).then(console.log);

// Promise.allでの実装
const computeSum2 = async (numArray) => {
  let sum = 0;
  const array = await Promise.all(numArray.map(e => e.catch(() => 0)))
  for (const e of array) {
    sum += e;
  }
  return sum;
};

computeSum2(
  [1, 2, 3, 4].map((e) =>
    e % 2 === 0 ? Promise.resolve(e) : Promise.reject(new Error('Error!!'))
  )
).then(console.log);
