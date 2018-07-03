import { get as getConfig } from '@cmos/web/config';
import { registerHelper } from '@cmos/web/handlebars';

export default function () {
	registerHelper('BASE_URL', function () {
		return getConfig().BASE_URL;
	})
};