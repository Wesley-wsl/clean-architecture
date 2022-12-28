type Product = {
  id: string;
  name: string;
  price: number;
};

export interface IInputListProductDto {}

export interface IOutputListProductDto {
  products: Product[];
}
