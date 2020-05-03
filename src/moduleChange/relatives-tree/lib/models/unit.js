import { prop } from '../utils';
class Unit {
    constructor(familyId, nodes, isChild = false) {
        this.familyId = familyId;
        this.isChild = isChild;
        this.nodes = nodes;
        this.shift = 0;
    }
    get size() {
        return this.nodes.length;
    }
    get right() {
        return this.shift + (this.size * 2);
    }
    get ids() {
        return this.nodes.map(prop('id'));
    }
}
export default Unit;
//# sourceMappingURL=unit.js.map