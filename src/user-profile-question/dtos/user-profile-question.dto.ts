import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsArray } from 'class-validator';

export class UserProfileQuestionDto {
  @Allow()
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  id: string;

  @Allow()
  @ApiProperty({ example: 'John' })
  first_name: string;

  @Allow()
  @ApiProperty({ example: 'Doe' })
  last_name: string;

  @Allow()
  @ApiProperty({ example: 'test1@example.com' })
  email: string;

  @Allow()
  @ApiProperty({ example: '0987654321' })
  phone_no: string;

  @Allow()
  @ApiProperty({ example: 'true' })
  is_guide: string;

  @IsArray()
  @ApiProperty({
    example: [
      {
        user_id: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
        question: 'Why do you think you will be a good Guide ?',
        answer: 'answer...',
      },
      {
        user_id: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
        question: 'What locations will you be running your Adventures?',
        answer: 'answer...',
      },
    ],
  })
  user_profile_question: string;
}
