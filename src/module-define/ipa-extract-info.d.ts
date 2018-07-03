declare module "ipa-extract-info" {
	export interface ipaExtractInfo {
		token: string;
		buffer: Buffer;
	}
	export function ipaExtractInfo(dom: HTMLInputElement, cb: (err: Error, info: any, raw: any) => void): void;
	export default ipaExtractInfo;
}

declare const __DEV__: boolean;
declare const __PRODUCT__: boolean;
