import { prop, max } from './index';
export default (families) => ({
    width: max(families.map(prop('right'))),
    height: max(families.map(prop('top'))) + 4,
});
//# sourceMappingURL=getCanvasSize.js.map