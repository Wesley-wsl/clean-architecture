import { Sequelize } from "sequelize-typescript";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import OrderModel from "./order.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import { Customer } from "../../../../domain/customer/entity/customer";
import { Product } from "../../../../domain/product/entity/product";
import Order from "../../../../domain/checkout/entity/order";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          product_id: orderItem.productId,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const productTwo = new Product("11", "Product 2", 5);
    await productRepository.create(productTwo);
    const orderItemTwo = new OrderItem(
      "2",
      productTwo.name,
      productTwo.price,
      productTwo.id,
      2
    );

    const orderToUpdate = new Order(order.id, order.customerId, [
      orderItem,
      orderItemTwo,
    ]);

    await orderRepository.update(orderToUpdate);
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: orderToUpdate.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
        {
          id: orderItemTwo.id,
          name: orderItemTwo.name,
          price: orderItemTwo.price,
          quantity: orderItemTwo.quantity,
          order_id: "123",
          product_id: "11",
        },
      ],
    });
  });

  it("Should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("12", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFinded = await orderRepository.find(order.id);

    expect(orderFinded).toStrictEqual(order);
  });

  it("Should find a all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "John");
    const address = new Address("Street 1", 1, "ZipCode 1", "City 1");

    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    const product2 = new Product("2", "Product 2", 5);
    await productRepository.create(product);
    await productRepository.create(product2);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const orderItem2 = new OrderItem(
      "3",
      product2.name,
      product2.price,
      product2.id,
      2
    );

    const order = new Order("12", "123", [orderItem]);
    const order2 = new Order("13", "123", [orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);
    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toStrictEqual([order, order2]);
  });
});
