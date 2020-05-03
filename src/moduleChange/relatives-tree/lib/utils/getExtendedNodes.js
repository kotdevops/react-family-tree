import hasHiddenRelatives from './hasHiddenRelatives';
import { flat } from './index';
const PARENTS = ['root', 'parent'];
const CHILDREN = ['root', 'child'];
const extendNode = (family) => (unit) => (unit.nodes.map((node, idx) => (Object.assign({}, node, { top: family.top + (unit.isChild ? 2 : 0), left: family.left + unit.shift + (idx * 2), hasSubTree: hasHiddenRelatives(family, node) }))));
const getParentNodes = (family) => (~PARENTS.indexOf(family.type) ? family.pUnits : []).map(extendNode(family));
const getChildNodes = (family) => (~CHILDREN.indexOf(family.type) ? family.cUnits : []).map(extendNode(family));
const mapFamily = (family) => [...getParentNodes(family), ...getChildNodes(family)].reduce(flat);
export default (families) => families.map(mapFamily).reduce(flat);
//# sourceMappingURL=getExtendedNodes.js.map