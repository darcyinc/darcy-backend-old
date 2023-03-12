import { Module } from '@nestjs/common';
import { GetUser } from '../../application/use-cases/get-user.js';
import { DatabaseModule } from '../database/database.module';
import { HttpController } from './controllers/http.controller';
import { UsersController } from './controllers/users.controller';

@Module({
	imports: [DatabaseModule],
	controllers: [UsersController, HttpController],
	providers: [GetUser],
})
export class HttpModule {}
