export type Webhook = {
  id?: string;
  name: string;
  url: string;
  method: string;
  body?: string;
  user: string;
};
