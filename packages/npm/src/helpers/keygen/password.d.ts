interface passwordOptionsProps {
    length: number;
    includeUppercase?: boolean;
    includeLowercase?: boolean;
    includeNumbers?: boolean;
    includeSymbols?: boolean;
    easyToRead?: boolean;
    easyToSay?: boolean;
}
export declare function generatePassword({ length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, easyToRead, easyToSay }: passwordOptionsProps): string;
export {};
