import { Order } from "src/orders/order.entity";
import { User } from "src/users/user.entity";

export interface SubscriptionFilter {
    nextOrderDate: Date | null;
    users: User[] | null;
}