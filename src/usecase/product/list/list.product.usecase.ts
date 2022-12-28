import { Product } from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  IInputListProductDto,
  IOutputListProductDto,
} from "./list.product.dto";

export class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: IInputListProductDto): Promise<IOutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  static toOutput(products: Product[]): IOutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
