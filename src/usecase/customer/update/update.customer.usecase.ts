import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import {
  IInputUpdateCustomerDto,
  IOutputUpdateCustomerDto,
} from "./update.customer.dto";

export default class UpdateCustomerUseCase {
  private CustomerRepository: CustomerRepositoryInterface;

  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = CustomerRepository;
  }

  async execute(
    input: IInputUpdateCustomerDto
  ): Promise<IOutputUpdateCustomerDto> {
    const customer = await this.CustomerRepository.find(input.id);
    customer.changeName(input.name);
    customer.changeAddress(
      new Address(
        input.address.street,
        input.address.number,
        input.address.zip,
        input.address.city
      )
    );
    await this.CustomerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}
