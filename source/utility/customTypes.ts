export type LoginFormErrors = 'Non-Existing User' | 'Locked-Out User' | 'Mandatory Fields';

export interface ProductDetails {
  productTitle: string;
  productDescription: string;
  productPrice: string;
}
export interface ProductInfo extends ProductDetails {
  productIndex: number;
}

export interface ClientDetails {
  firstName: string;
  lastName: string;
  postCode: string;
}
