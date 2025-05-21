import { Module } from '@nestjs/common';
import { SqlController } from './sql.controller';
import { SqlRunnerService } from './sql-runner.service';

@Module({
  imports: [],
  controllers: [SqlController],
  providers: [SqlRunnerService],
})
export class SqlModule {}
