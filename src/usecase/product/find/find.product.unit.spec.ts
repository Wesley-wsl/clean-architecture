import { FindProductUseCase } from "./find.product.usecase";

const product1 = {
  id: "123",
  name: "Product1",
  price: 10,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product1)),
    findAll: jest.fn(),
  };
};

describe("Unit test find a product use case.", () => {
  it("Should find a product", async () => {
    const productRepository = MockRepository();
    const productFindUseCase = new FindProductUseCase(productRepository);

    const output = await productFindUseCase.execute({
      id: product1.id,
    });

    expect(output.id).toBe(product1.id);
    expect(output.name).toBe(product1.name);
    expect(output.price).toBe(product1.price);
  });
});
