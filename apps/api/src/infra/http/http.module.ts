import { AuthenticateUser } from '@application/use-cases/authenticate-user';
import { CreateUser } from '@application/use-cases/create-user';
import { GetUser } from '@application/use-cases/get-user';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { HttpController } from './controllers/http.controller';
import { UsersController } from './controllers/users.controller';

@Module({
	imports: [DatabaseModule],
	controllers: [AuthController, HttpController, UsersController],
	providers: [CreateUser, AuthenticateUser, GetUser],
})
export class HttpModule {}
