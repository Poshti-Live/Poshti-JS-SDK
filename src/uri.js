export default class URI {
  static serialize(obj, parentKey) {
    let queryStr = [];
    for (var key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        continue;
      }
      let paramKey = parentKey ? `${parentKey}[${key}]` : key;
      let paramVal = obj[key];
      if (typeof paramVal === 'object') {
        queryStr.push(this.serialize(paramVal, paramKey));
      } else {
        queryStr.push(
          encodeURIComponent(paramKey) + '=' + encodeURIComponent(paramVal),
        );
      }
    }
    return queryStr.join('&');
  }

  static appendParams(url, params) {
    if (Object.keys(params).length === 0) {
      return url;
    }

    let prefix = url.match(/\?/) ? '&' : '?';
    return `${url}${prefix}${this.serialize(params)}`;
  }
}
