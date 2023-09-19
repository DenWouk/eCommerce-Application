export interface ICustomer {
  id: string;
  dateOfBirth: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: string[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: string[];
}
