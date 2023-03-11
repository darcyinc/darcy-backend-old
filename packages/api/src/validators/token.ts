import { string } from 'zod';

export default string()
	.startsWith('Bearer ')
	.regex(/Bearer [\w=-]+\.[\w=-]+\.?[\w+./=-]*/);
