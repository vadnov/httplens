export interface BinRequest {
  method: string;
  headers: Map<string, string>;
  body: string;
  received: Date;
}
