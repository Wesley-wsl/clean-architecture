import { CreateProductUseCase } from "./create.product.usecase";

const input = {
  name: "Product1",
  price: 10,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit test create product use case.", () => {
  it("Should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("Should throw error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "";

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("Should throw error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    input.name = "Product1";
    input.price = -10;

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
