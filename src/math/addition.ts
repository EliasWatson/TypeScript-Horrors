import { Input, Output } from "../util";

type AdditionLookupTable = {
  "00": "0";
  "01": "1";
  "02": "2";
  "03": "3";
  "04": "4";
  "05": "5";
  "06": "6";
  "07": "7";
  "08": "8";
  "09": "9";
  "10": "1";
  "11": "2";
  "12": "3";
  "13": "4";
  "14": "5";
  "15": "6";
  "16": "7";
  "17": "8";
  "18": "9";
  "19": "0";
  "20": "2";
  "21": "3";
  "22": "4";
  "23": "5";
  "24": "6";
  "25": "7";
  "26": "8";
  "27": "9";
  "28": "0";
  "29": "1";
  "30": "3";
  "31": "4";
  "32": "5";
  "33": "6";
  "34": "7";
  "35": "8";
  "36": "9";
  "37": "0";
  "38": "1";
  "39": "2";
  "40": "4";
  "41": "5";
  "42": "6";
  "43": "7";
  "44": "8";
  "45": "9";
  "46": "0";
  "47": "1";
  "48": "2";
  "49": "3";
  "50": "5";
  "51": "6";
  "52": "7";
  "53": "8";
  "54": "9";
  "55": "0";
  "56": "1";
  "57": "2";
  "58": "3";
  "59": "4";
  "60": "6";
  "61": "7";
  "62": "8";
  "63": "9";
  "64": "0";
  "65": "1";
  "66": "2";
  "67": "3";
  "68": "4";
  "69": "5";
  "70": "7";
  "71": "8";
  "72": "9";
  "73": "0";
  "74": "1";
  "75": "2";
  "76": "3";
  "77": "4";
  "78": "5";
  "79": "6";
  "80": "8";
  "81": "9";
  "82": "0";
  "83": "1";
  "84": "2";
  "85": "3";
  "86": "4";
  "87": "5";
  "88": "6";
  "89": "7";
  "90": "9";
  "91": "0";
  "92": "1";
  "93": "2";
  "94": "3";
  "95": "4";
  "96": "5";
  "97": "6";
  "98": "7";
  "99": "8";
};

type CarryLookupTable = {
  "00": false;
  "01": false;
  "02": false;
  "03": false;
  "04": false;
  "05": false;
  "06": false;
  "07": false;
  "08": false;
  "09": false;
  "10": false;
  "11": false;
  "12": false;
  "13": false;
  "14": false;
  "15": false;
  "16": false;
  "17": false;
  "18": false;
  "19": true;
  "20": false;
  "21": false;
  "22": false;
  "23": false;
  "24": false;
  "25": false;
  "26": false;
  "27": false;
  "28": true;
  "29": true;
  "30": false;
  "31": false;
  "32": false;
  "33": false;
  "34": false;
  "35": false;
  "36": false;
  "37": true;
  "38": true;
  "39": true;
  "40": false;
  "41": false;
  "42": false;
  "43": false;
  "44": false;
  "45": false;
  "46": true;
  "47": true;
  "48": true;
  "49": true;
  "50": false;
  "51": false;
  "52": false;
  "53": false;
  "54": false;
  "55": true;
  "56": true;
  "57": true;
  "58": true;
  "59": true;
  "60": false;
  "61": false;
  "62": false;
  "63": false;
  "64": true;
  "65": true;
  "66": true;
  "67": true;
  "68": true;
  "69": true;
  "70": false;
  "71": false;
  "72": false;
  "73": true;
  "74": true;
  "75": true;
  "76": true;
  "77": true;
  "78": true;
  "79": true;
  "80": false;
  "81": false;
  "82": true;
  "83": true;
  "84": true;
  "85": true;
  "86": true;
  "87": true;
  "88": true;
  "89": true;
  "90": false;
  "91": true;
  "92": true;
  "93": true;
  "94": true;
  "95": true;
  "96": true;
  "97": true;
  "98": true;
  "99": true;
};

type IncrementLookupTable = {
  "0": "1";
  "1": "2";
  "2": "3";
  "3": "4";
  "4": "5";
  "5": "6";
  "6": "7";
  "7": "8";
  "8": "9";
  // 9 is not possible
};

type LookupAddition<K> = K extends keyof AdditionLookupTable
  ? AdditionLookupTable[K]
  : never;
type LookupCarry<K> = K extends keyof CarryLookupTable
  ? CarryLookupTable[K]
  : never;
type LookupIncrement<K> = K extends keyof IncrementLookupTable
  ? IncrementLookupTable[K]
  : never;

export type Add<A, B, Carry = false> = A extends `${infer AHead}${infer ATail}`
  ? B extends `${infer BHead}${infer BTail}`
    ? // Both A and B have digits
      Carry extends true
      ? LookupAddition<`${AHead}${BHead}`> extends "9"
        ? `0${Add<ATail, BTail, true>}`
        : `${LookupIncrement<LookupAddition<`${AHead}${BHead}`>>}${Add<ATail, BTail, LookupCarry<`${AHead}${BHead}`>>}`
      : `${LookupAddition<`${AHead}${BHead}`>}${Add<ATail, BTail, LookupCarry<`${AHead}${BHead}`>>}`
    : // A has digits, B has no more digits
      Carry extends true
      ? `${LookupIncrement<AHead>}${ATail}`
      : A
  : B extends `${infer BHead}${infer BTail}`
    ? // A has no more digits, B has digits
      Carry extends true
      ? `${LookupIncrement<BHead>}${BTail}`
      : B
    : // No more digits in A or B
      Carry extends true
      ? "1"
      : "";

type Test = Output<Add<Input<37935>, Input<5144>>>;
