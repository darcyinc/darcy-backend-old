import { InfraModule } from '@infra/infra.module';
import { Module } from '@nestjs/common';

@Module({
	imports: [InfraModule],
})
export class AppModule {}
