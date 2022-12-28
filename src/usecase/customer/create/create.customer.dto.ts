export interface IInputCreateCustomerDto {
    name: string;
    address: {
      street: string;
      number: number;
      zip: string;
      city: string;
    };
  }
  
  export interface IOutputCreateCustomerDto {
    id: string;
    name: string;
    address: {
      street: string;
      number: number;
      zip: string;
      city: string;
    };
  }