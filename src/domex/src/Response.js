class Response {
  constructor() {
    this._statusCode = 200;
    this._isResponseSent = false;
    this._responseData = null;
  }
  status(status = 200) {
    this._statusCode = status;
    return this;
  }

  sendStatus(...args) {
    return this._response(...args);
  }
  send(...args) {
    return this._response(...args);
  }

  json(...args) {
    return this._response(...args);
  }

  _response(data, status = 200) {
    if (this._isResponseSent) {
      console.error('A response has been already sent for this request.');
      throw new Error('A response has been already sent for this request.');
    }
    if (this._responseResolver) {
      this._isResponseSent = true;
      this._responseResolver({ status, data });
    }
    return data;
  }

  getResponseData() {
    return this._responseData;
  }
  setResponseSent(_isResponseSent) {
    this._isResponseSent = _isResponseSent;
  }
  getStatus() {
    return this._statusCode;
  }
  setResolver(resolver) {
    this._responseResolver = resolver;
  }
}
export default Response;
