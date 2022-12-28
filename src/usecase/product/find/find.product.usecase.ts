import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  IInputFindProductDto,
  IOutputFindProductDto,
} from "./find.product.dto";

export class FindProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: IInputFindProductDto): Promise<IOutputFindProductDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
