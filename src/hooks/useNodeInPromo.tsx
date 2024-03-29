import {useContext, useEffect, useState} from 'react';
import {ShopContext} from '../context/shop/ShopContext';
import {Node} from '../interfaces/Node.interface';

export const useNodeInPromo = (nodes: Partial<Node>[]) => {
  const [nodeInPromo, setNodeInPromo] = useState(false);
  const {discountPromo} = useContext(ShopContext);

  useEffect(() => {
    const nodesList = nodes.map(n => n.id);
    const nodesPromo = discountPromo.nodes.map(n => {
      if (n !== undefined) {
        return n;
      }
    });
    if (nodesList.some(node => nodesPromo.includes(node))) {
      setNodeInPromo(true);
    }
  }, [nodes, discountPromo]);

  return {nodeInPromo};
};
