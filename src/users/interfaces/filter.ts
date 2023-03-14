import { Address } from "src/addresses/entities/address.entity"
import { Subscription } from "src/subscription/subscription.entity"

export interface UserFilter {
    isActive: boolean | null;
    isStaff: boolean | null;
    subscriptions: Subscription[] | null;
    addresses: Address[] | null;
}