import { Input, Output, StripLeadingZeroes } from "../util";

type DecrementLookupTable = {
  // 0 is not possible
  "1": "0";
  "2": "1";
  "3": "2";
  "4": "3";
  "5": "4";
  "6": "5";
  "7": "6";
  "8": "7";
  "9": "8";
};

type LookupDecrement<K> = K extends keyof DecrementLookupTable
  ? DecrementLookupTable[K]
  : never;

export type Decrement<
  S,
  Borrow = false,
> = S extends `${infer Head}${infer Tail}`
  ? Head extends "0"
    ? StripLeadingZeroes<`9${Decrement<Tail, true>}`>
    : `${LookupDecrement<Head>}${Tail}`
  : Borrow extends true
    ? never
    : "";

type Test = Output<Decrement<Input<100>>>;
