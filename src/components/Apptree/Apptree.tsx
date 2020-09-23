import React, {useState, useEffect} from 'react';
import PinchZoomPan from '../../moduleChange/pinch-zoom-pan';
import { IFamilyNode, IFamilyExtNode } from '../../moduleChange/relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from '../FamilyNode/FamilyNode';
import styles from './Apptree.module.css';

const WIDTH = 150;
const HEIGHT = 190;

type IState = {
  myID: string;
  nodes: object;
}

export const Apptree = ({ myID, nodes }: IState) => { 
  
  const [rootId, setRootId] = useState(myID);
  const [rootNodes, setRootNode] = useState(nodes);
  const onResetClick = React.useCallback(() => {
    setRootId(myID);
    setRootNode(nodes);
  }, [myID, nodes]);
  useEffect(() => {
    setRootId(myID);
    setRootNode(nodes);
  }, [myID, nodes]);

  return (
    <div className={styles.apptree}>      
      <PinchZoomPan
          // debug
          captureWheel
          min={0.1}
          max={5}
          style={{scale:0.5}}
          className={styles.wrapper}
        >
          <ReactFamilyTree
            nodes={rootNodes as IFamilyNode[]}
            rootId={rootId}
            width={WIDTH}
            height={HEIGHT}
            canvasClassName={styles.tree}
            renderNode={(node: IFamilyExtNode) => (
              <FamilyNode
                key={node.id}
                node={node}
                isRoot={node.id === rootId}
                onSubClick={setRootId}
                style={{
                  width: WIDTH,
                  height: HEIGHT,
                  transform: `translate(${node.left * (WIDTH / 2)}px, ${node.top * (HEIGHT / 2)}px)`,
                }}
              />
            )}
          />
        </PinchZoomPan>
        {rootId !== myID && (
          <div className={styles.reset} onClick={onResetClick}>
            Reset
          </div>
        )}
    </div>
  );
}

export default React.memo(Apptree);