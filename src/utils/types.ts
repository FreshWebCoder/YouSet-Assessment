export type Insurer = "proteco" | "umbrella" | "thor";

export type Gender = "man" | "woman";

export interface IUser {
  email: string;
  age: number;
  gender: Gender;
};
