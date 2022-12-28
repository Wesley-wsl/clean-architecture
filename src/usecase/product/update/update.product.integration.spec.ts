import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update a product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product1", 10);

    await productRepository.create(product);

    product.changeName("Product 1000");
    product.changePrice(20);

    const output = await productUpdateUseCase.execute(product);

    expect(output.id).toBe(product.id);
    expect(output.name).toBe(product.name);
    expect(output.price).toBe(product.price);
  });

  it("Should throw error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product1", 10);

    await productRepository.create(product);

    await expect(
      productUpdateUseCase.execute({
        id: product.id,
        name: "",
        price: product.price,
      })
    ).rejects.toThrow("Name is required");
  });

  it("Should throw error when price is less than zero", async () => {
    const productRepository = new ProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const product = new Product("123", "Product1", 10);

    await productRepository.create(product);

    await expect(
      productUpdateUseCase.execute({
        id: product.id,
        name: product.name,
        price: -10,
      })
    ).rejects.toThrow("Price must be greater than zero");
  });
});
