export class Helper {
  private static origin = "*";

  static getHeaders() {
    return {
      "Access-Control-Allow-Origin": Helper.origin,
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
    };
  }
}
