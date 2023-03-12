import { AuthenticateUser } from '@application/use-cases/authenticate-user';
import { CreateUser } from '@application/use-cases/create-user';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { HttpController } from './controllers/http.controller';

@Module({
	imports: [DatabaseModule],
	controllers: [AuthController, HttpController],
	providers: [CreateUser, AuthenticateUser],
})
export class HttpModule {}
