export function getParam(key: string): string {
    let url = window.location.search;
    // find key=value without UrlSearchParams
    let regex = new RegExp(`${key}=([^&]+)`);
    let match = url.match(regex);
    if (match) {
        return match[1];
    } else {
        return "";
    }
}