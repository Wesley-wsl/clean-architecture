import { Product } from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("123", "Product1", 10);

const input = {
  id: product.id,
  name: "Product 1000",
  price: 20,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a customer", async () => {
    const customerRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(customerRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("Should throw error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    input.name = "Product1";
    input.price = -10;

    await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });

  it("Should throw error when name is missing", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    input.name = "";
    input.price = 20;

    await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });
});
