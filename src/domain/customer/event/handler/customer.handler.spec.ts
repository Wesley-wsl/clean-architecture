import { Customer } from "../../entity/customer";
import Address from "../../value-object/address";
import CustomerChangedAddressHandler from "../customer-changed-address.event";
import CustomerCreatedEvent from "../customer-created.event";

import SendAddressChangeHandler from "./send-address-change.handler";
import SendFirstLogWhenCustomerIsCreatedHandler from "./send-first-log-when-customer-is-created.handler";
import SendSecondLogWhenCustomerIsCreatedHandler from "./send-second-log-when-customer-is-created";

describe("Test customer's domain events", () => {
  it("should send first log when customer is created handler", () => {
    const customer = new Customer("123", "John");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    const sendFirstLogWhenCustomerIsCreatedHandler =
      new SendFirstLogWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(
      sendFirstLogWhenCustomerIsCreatedHandler,
      "handle"
    );

    sendFirstLogWhenCustomerIsCreatedHandler.handle(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should send second log when customer is created handler", () => {
    const customer = new Customer("123", "John");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    const sendSecondLogWhenCustmoerIsCreatedHandler =
      new SendSecondLogWhenCustomerIsCreatedHandler();
    const spyEventHandler = jest.spyOn(
      sendSecondLogWhenCustmoerIsCreatedHandler,
      "handle"
    );

    sendSecondLogWhenCustmoerIsCreatedHandler.handle(customerCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should send informations about address when address's customer is changed handler", () => {
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 2, "Zip", "City");
    customer.changeAddress(address);
    const customerChangedAddressHandler = new CustomerChangedAddressHandler(
      customer
    );
    const sendAddressChangeHandler = new SendAddressChangeHandler();
    const spyEventHandler = jest.spyOn(sendAddressChangeHandler, "handle");

    sendAddressChangeHandler.handle(customerChangedAddressHandler);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
