declare type strOrNum = string | number

declare type strOrNumObj = {[key: string]: strOrNum}

declare type noop = (...args: any[]) => any
