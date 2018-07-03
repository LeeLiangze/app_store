import { set as setConfig } from '@cmos/web/config';
import hdbr from '@cmos/web/handlebars';
(<any>window).hdbr = hdbr;

let BASE_URL = "";
if (__DEV__) {
	BASE_URL = "http://localhost:7001/"
}

setConfig({
	BASE_URL: BASE_URL
});

export default () => { };