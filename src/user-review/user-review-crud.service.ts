import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { UserReview } from "./user-review.entity";

export class UserReviewCrudService extends TypeOrmCrudService<UserReview> {
    constructor(
      @InjectRepository(UserReview)
      private userReviewRepository: Repository<UserReview>
    ) {
      super(userReviewRepository)
    }
}