export interface IErrorDictionary {
    required: string;
    minlength: string;
    maxlength: string;
    email: string;
    min: string;
    passwordMismatch: string;
    mask: string;
    pattern: string;
}

export const errorDictionary: IErrorDictionary = {
    pattern: "Password should be at least 3 and max 10 chars",
    mask: "Incorrect phone format",
    required: "Field is required",
    minlength: "Too short",
    maxlength: "Too long",
    email: "Incorrect email format.",
    min: "Should be older then 18",
    passwordMismatch: "Passwords ain't match",
};

export type ErrorDictionaryKey = keyof typeof errorDictionary;
