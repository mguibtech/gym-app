import { string } from "yup";

export type HistoryDTO = {
  id: string;
  name: string;
  group: string;
  hour: string;
  created_at: string;
}