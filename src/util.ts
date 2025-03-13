export type Reverse<S> = S extends `${infer Head}${infer Tail}`
  ? `${Reverse<Tail>}${Head}`
  : "";
export type ToNumber<S> = S extends `${infer N extends number}` ? N : never;

export type Input<N extends number> = Reverse<`${N}`>;
export type Output<S extends string> = ToNumber<Reverse<S>>;
