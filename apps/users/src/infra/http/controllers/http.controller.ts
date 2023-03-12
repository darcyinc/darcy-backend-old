import { Controller, Get } from '@nestjs/common';

@Controller()
export class HttpController {
	@Get('health')
	public getHealth() {
		return 'OK';
	}
}
