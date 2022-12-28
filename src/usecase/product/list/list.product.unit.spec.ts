import { ListProductUseCase } from "./list.product.usecase";

const product1 = {
  id: "123",
  name: "Product1",
  price: 10,
};

const product2 = {
  id: "1234",
  name: "Product1",
  price: 10,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit test list products use case.", () => {
  it("Should create a product", async () => {
    const productRepository = MockRepository();
    const productListUseCase = new ListProductUseCase(productRepository);

    const output = await productListUseCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
    expect(output.products[1].id).toBe(product2.id);
    expect(output.products[1].name).toBe(product2.name);
    expect(output.products[1].price).toBe(product2.price);
  });
});
