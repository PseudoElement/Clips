export interface IErrorDictionary {
    required: string;
    minlength: string;
    maxlength: string;
    email: string;
    min: string;
    passwordMismatch: string;
    emailTaken: string;
    mask: string;
    pattern: string;
}

export const errorDictionary: IErrorDictionary = {
    pattern: "Password should contain at least 1 letter and 1 digit",
    mask: "Incorrect phone format",
    required: "Field is required",
    minlength: "Too short",
    maxlength: "Too long",
    email: "Incorrect email format.",
    min: "Should be older then 18",
    passwordMismatch: "Passwords ain't match",
    emailTaken: "Email is already taken.",
};

export type ErrorDictionaryKey = keyof typeof errorDictionary;
