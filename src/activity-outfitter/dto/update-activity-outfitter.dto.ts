import { PartialType } from '@nestjs/swagger';
import { CreateActivityOutfitterDto } from './create-activity-outfitter.dto';

export class UpdateActivityOutfitterDto extends PartialType(CreateActivityOutfitterDto) {}
