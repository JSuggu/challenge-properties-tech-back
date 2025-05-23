import { Controller, Post } from '@nestjs/common';
import { SqlRunnerService } from '../sql/sql-runner.service';

@Controller('sql')
export class SqlController {
  constructor(private readonly sqlRunnerService: SqlRunnerService){}

  @Post('/public/init-data')
  async initData(){
    await this.sqlRunnerService.runSqlFile();
  }
}