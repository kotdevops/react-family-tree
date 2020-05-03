import React, { useState, useCallback } from 'react';
import PinchZoomPan from 'pinch-zoom-pan';
// import { IFamilyNode, IFamilyExtNode } from 'relatives-tree';
import { IFamilyNode, IFamilyExtNode } from '../../moduleChange/relatives-tree';
import ReactFamilyTree from 'react-family-tree';
import FamilyNode from '../FamilyNode/FamilyNode';
import styles from './App.module.css';

// import nodes from '../../assests/familyData/sample.json';
// const myID = 'root';
// const myID = 'kuVISwh7w';


// import nodes from '../../assests/familyData/meImgSource.json';
import nodes from '../../assests/familyData/mePhoto.json';
import { KeyObject } from 'crypto';
const myID = 'mine';

const WIDTH = 90;
const HEIGHT = 100;

interface KeyboardEvent {
  enterKey: false;
}

export default React.memo<{}>(
  function App() {
    const [rootId, setRootId] = useState<string>(myID);
    const [inputedValue, setInputValue] = useState('');
    const onKeyPress = () => {
      if (0) {
        getKeyID();
      } else {
        return;
      }
     
    }
    const onResetClick = useCallback(() => setRootId(myID), []);    
    const getKeyID = () => {
      setRootId(inputedValue);
    }    

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            FamilyTree
          </h1>
          <label>
            Searcy ID:  <input name="name" placeholder="Please input here." onChange={e => setInputValue(e.target.value)} onKeyPress={onKeyPress} />
            <button onClick={getKeyID} >Search</button>
          </label>
          <a href="https://github.com/SanichKotikov/react-family-tree-example">GitHub</a>
        </header>
        <PinchZoomPan
          debug
          captureWheel
          min={0.5}
          max={2.5}
          className={styles.wrapper}
        >
          <ReactFamilyTree
            nodes={nodes as IFamilyNode[]}
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
);
