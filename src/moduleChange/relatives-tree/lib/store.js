import { withId } from './utils';
const ERROR_PREFIX = '[relatives-tree::store]:';
const mapNode = (node) => [node.id, Object.assign({}, node)];
class Store {
    constructor(nodes, rootId) {
        if (!nodes.find(withId(rootId))) {
            throw new Error(`${ERROR_PREFIX} Can't find a root node with ID: ${rootId}`);
        }
        this.nextId = 0;
        this.families = new Map();
        this.nodes = new Map(nodes.map(mapNode));
        this.rootNode = this.nodes.get(rootId);
        this.gender = this.rootNode.gender;
    }
    getNextId() { return ++this.nextId; }
    getNode(id) { return this.nodes.get(id); }
    getNodes(ids) { return ids.map(this.getNode.bind(this)); }
    getFamily(id) { return this.families.get(id); }
    get familiesArray() { return [...this.families.values()]; }
}
export default Store;
//# sourceMappingURL=store.js.map