// Generated by https://quicktype.io

export interface MessageResponse {
  count: number;
  data: Message[];
}

export interface Message {
  de: string;
  para: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
