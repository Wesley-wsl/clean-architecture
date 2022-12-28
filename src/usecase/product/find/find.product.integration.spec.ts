import { Sequelize } from "sequelize-typescript";
import { Product } from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { FindProductUseCase } from "./find.product.usecase";

describe("Test find a product use case", () => {
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

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const productListUseCase = new FindProductUseCase(productRepository);

    const product1 = new Product("123", "Product1", 10);

    await productRepository.create(product1);

    const output = await productListUseCase.execute({
      id: product1.id,
    });

    expect(output.id).toBe(product1.id);
    expect(output.name).toBe(product1.name);
    expect(output.price).toBe(product1.price);
  });
});
