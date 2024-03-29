import {Image} from './Image.interface';

export interface NodePaginated {
  count: number;
  page: number;
  totalPages: number;
  data: Node[];
}

export interface Node {
  name: string;
  id: string;
  image: Image;
  personalCombo: boolean;
}
