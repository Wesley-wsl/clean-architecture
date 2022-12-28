import { v4 as uuid } from "uuid";
import { Product } from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  IInputCreateProductDto,
  IOutputCreateProductDto,
} from "./create.product.dto";

export class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: IInputCreateProductDto
  ): Promise<IOutputCreateProductDto> {
    const product = new Product(uuid(), input.name, input.price);

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
