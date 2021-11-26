import { Module } from '@nestjs/common';
import { VerifyController } from './verify.controller';
import { VerifyService } from './verify.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [VerifyController],
  providers: [VerifyService],
  imports: [UsersModule],
})
export class VerifyModule {}
