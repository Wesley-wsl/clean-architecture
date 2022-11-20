import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressHandler from "../customer-changed-address.event";

export default class SendAddressChangeHandler
  implements EventHandlerInterface<CustomerChangedAddressHandler>
{
  handle(event: CustomerChangedAddressHandler): void {
    console.log(
      `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.Address}`
    );
  }
}
