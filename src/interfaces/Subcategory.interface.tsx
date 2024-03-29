import {Image} from './Image.interface';

export interface SubcategoryResp {
  count: number;
  page: number;
  totalPages: number;
  data: Subcategory[];
}

export interface Subcategory {
  status: boolean;
  soldOut: boolean;
  name: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  description: Description[];
  id: string;
  weight: number;
  cost: number;
  info: string[];
  nodes?: string[];
  personalCombo: string;
}

export interface AviableSize {
  talla: string;
  peso: number;
}

export interface Description {
  title: string;
  content: string;
}

export interface SucategoryResponse {
  count: number;
  page: number;
  totalPages: number;
  data: Subcategory[];
}
