import parents from './parents';
import middle from './middle';
import children from './children';
import { flat } from '../utils';
const sequence = [parents, middle, children];
const toConnectors = (families) => (fn) => fn(families);
export default (families) => (sequence.map(toConnectors(families)).reduce(flat));
//# sourceMappingURL=index.js.map