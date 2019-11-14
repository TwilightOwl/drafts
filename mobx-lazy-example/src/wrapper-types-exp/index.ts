const wrapper = <A extends unknown/*any*/[], R>(original: (...x: A) => R): (...x: A) => Promise<R> => {
  return async (...args) => original(...args)
}

const f1 = (x: number) => x + 1;
const f2 = (x: number, s: string) => `${x}-${s}`;

const g1 = wrapper(f1);
const g2 = wrapper(f2);

g1(4)
g1(3)
g2(3,'a')

// ts errors as expected :)
g2(3, 4)
g2('a', 4)
g2('a', 4, 4)

export default wrapper;