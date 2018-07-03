export * from './main';
import test1 from './coms/test1/index';
import test2 from './coms/test2/index';

const c_test1 = new test1('#test1');
const c_test2 = new test2('#test2');

//组件间交互
c_test1.on('test_event', (...args: any[]) => {
	c_test2.test_event(...args);
});