export function stripTrailingSlash(str: string): string {
    const expression  = new RegExp(/\/+$/g)
    return str.replace(expression, '')
}
