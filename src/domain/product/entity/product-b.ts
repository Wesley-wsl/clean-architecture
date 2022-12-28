// import ProductInterface from "./product.interface";

// export class ProductB implements ProductInterface {
//   private _id: string;
//   private _name: string;
//   private _price: number;

//   constructor(id: string, name: string, price: number) {
//     this._id = id;
//     this._name = name;
//     this._price = price;
//     this.validate();
//   }

//   get id(): string {
//     return this._id;
//   }

//   get name(): string {
//     return this._name;
//   }

//   get price(): number {
//     return this._price * 2;
//   }

//   changeName(name: string): void {
//     this._name = name;
//     this.validate();
//   }

//   changePrice(price: number): void {
//     this._price = price;
//     this.validate();
//   }

//   validate(): boolean {
//     if (this._id.length === 0) {
//       throw new Error("Id is required");
//     }
//     if (this._name.length === 0) {
//       throw new Error("Name is required");
//     }
//     if (this._price < 0) {
//       throw new Error("Price must be greater than zero");
//     }
//     return true;
//   }
// }

import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import ProductInterface from "./product.interface";

export class ProductB extends Entity implements ProductInterface {
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price * 2;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      this.notification.addError({
        context: "productb",
        message: "Id is required",
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        context: "productb",
        message: "Name is required",
      });
    }
    if (this._price < 0) {
      this.notification.addError({
        context: "productb",
        message: "Price must be greater than zero",
      });
    }
    return true;
  }
}
