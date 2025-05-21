import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SqlRunnerService {
  constructor(private readonly dataSource: DataSource) {}

  async runSqlFile(){
    try {
      const filePath = path.join(__dirname, '..', '..', '..', 'seeds', 'initial-data.sql');
      const sql = fs.readFileSync(filePath, 'utf8');
      await this.dataSource.query(sql);
      return 'Datos cargados correctamente desde el archivo SQL.';
    } catch (error) {
      throw new Error(`Error al ejecutar el archivo SQL: ${error.message}`);
    }
  }
}
