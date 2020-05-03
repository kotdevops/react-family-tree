import React from 'react';
import classNames from 'classnames';
// import { IFamilyExtNode } from 'relatives-tree';
import { IFamilyExtNode } from '../../moduleChange/relatives-tree';
import styles from './FamilyNode.module.css';

interface Props {
  node: IFamilyExtNode;
  isRoot: boolean;
  onSubClick: (id: string) => void;
  style?: React.CSSProperties;
}

export default React.memo<Props>(
  function FamilyNode({ node, isRoot, onSubClick, style }) {
    return (
      <div className={styles.root} style={style}>
        <div
          className={classNames(
            styles.inner,
            styles[node.gender],
            isRoot && styles.isRoot,            
          )}
        >
          <div><img src={node.photo} className={classNames(styles.backimg)} /></div>
          {/* <div><img src={require(node.photo)} className={classNames(styles.backimg)} /></div> */}
          <div><p className={classNames(styles.nameP)}>{node.id}</p></div>
        </div>
        {node.hasSubTree && (
          <div
            className={classNames(styles.sub, styles[node.gender])}
            onClick={() => onSubClick(node.id)}
          />
        )}
      </div>
    );
  }
);
