export default class Ask {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setBaseUrl(url) {
    this.baseUrl = url;
  }

  sendRequest(method, route, data) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + route);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            reject(new Error(`Error with Status Code ${xhr.status}: ${xhr.statusText}`));
          }
        }
      };
      xhr.onerror = () => {
        reject(new Error("Unable to connect to the server"));
      };
      if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  }

  get(route) {
    return this.sendRequest("GET", route);
  }

  post(route, data) {
    return this.sendRequest("POST", route, data);
  }

  put(route, data) {
    return this.sendRequest("PUT", route, data);
  }

  patch(route, data) {
    return this.sendRequest("PATCH", route, data);
  }

  delete(route, data) {
    return this.sendRequest("DELETE", route, data);
  }
}
