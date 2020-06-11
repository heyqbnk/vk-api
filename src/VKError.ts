/**
 * Represents an error sent from VKontakte
 */
export class VKError<D> extends Error {
  /**
   * Contains data error
   */
  public data: D;

  constructor(data: D) {
    super(JSON.stringify(data));
    this.data = data;
  }
}
