export function stripTrailingSlash(text: string): string {
    const expression  = new RegExp(/\/+$/g)
    return text.replace(expression, '')
}
