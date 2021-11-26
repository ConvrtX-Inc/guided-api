import { PartialType } from '@nestjs/swagger';
import { CreateTravelerReleaseDto } from './create-traveler-release.dto';

export class UpdateTravelerReleaseDto extends PartialType(CreateTravelerReleaseDto) {}
