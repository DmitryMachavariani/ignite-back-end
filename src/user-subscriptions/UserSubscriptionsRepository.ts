import {EntityRepository, Repository} from "typeorm";
import {UserSubscription} from "./entities";
import {User} from "../users/entities";
import {calculateOffset, PaginationRequest} from "../utils/pagination";

@EntityRepository(UserSubscription)
export class UserSubscriptionsRepository extends Repository<UserSubscription> {
    public findById(id: string): Promise<UserSubscription | undefined> {
        return this.findOne({
            where: {
                id
            }
        })
    }

    public findBySubscribedToNotReverted(subscribedTo: User, paginationRequest: PaginationRequest): Promise<UserSubscription[]> {
        return this.find({
            where: {
                subscribedTo,
                reverted: false
            },
            skip: calculateOffset(paginationRequest.page, paginationRequest.pageSize),
            take: paginationRequest.pageSize
        })
    }

    public findAllBySubscribedToNotReverted(subscribedTo: User): Promise<UserSubscription[]> {
        return this.find({
            where: {
                subscribedTo,
                reverted: false
            }
        })
    }

    public findAllBySubscribedUserNotReverted(subscribedUser: User): Promise<UserSubscription[]> {
        return this.find({
            where: {
                subscribedUser,
                reverted: false
            }
        })
    }

    public findBySubscribedUserNotReverted(subscribedUser: User, paginationRequest: PaginationRequest): Promise<UserSubscription[]> {
        return this.find({
            where: {
                subscribedUser,
                reverted: false
            },
            skip: calculateOffset(paginationRequest.page, paginationRequest.pageSize),
            take: paginationRequest.pageSize
        })
    }

    public findBySubscribedUserAndSubscribedToNotReverted(subscribedUser: User, subscribedTo: User): Promise<UserSubscription | undefined> {
        return this.findOne({
            where: {
                subscribedTo,
                subscribedUser,
                reverted: false
            }
        })
    }

    public async existsBySubscribedUserAndSubscribedToNotReverted(subscribedUser: User, subscribedTo: User): Promise<boolean> {
        return (await this.count({
            where: {
                subscribedUser,
                subscribedTo,
                reverted: false
            }
        })) !== 0;
    }
}
