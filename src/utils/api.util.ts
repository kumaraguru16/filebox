export class ApiHelper {
  static getRequestPayload(event: any) {
    const requestPayload = event.body
      ? event.isBase64Encoded != undefined && event.isBase64Encoded == true
        ? JSON.parse(Buffer.from(event.body, "base64").toString("ascii"))
        : JSON.parse(event.body)
      : {}; //Decode from Base64
    return requestPayload;
  }
}
