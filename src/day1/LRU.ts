type Node<T> = {
  value: T,
  prev?: Node<T>,
  next?: Node<T>,
};

function createNode<V>(value: V): Node<V> {
  return {value};
}

export default class LRU<K, V> {
  private length: number;
  private head?: Node<V>;
  private tail?: Node<V>;

  private lookup: Map<K, Node<V>>;
  private reverseLookup: Map<Node<V>, K>;
    
  constructor(private capacity: number = 10) {
    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  update(key: K, value: V): void {
  
    // does it exist?
    let node = this.lookup.get(key);
    if (!node) {
      node = createNode(value);
      this.length++;
      this.prepend(node);
      this.trimCache();

      this.lookup.set(key, node);
      this.reverseLookup.set(node, key);
    } else {
      this.detach(node);
      this.prepend(node);
      node.value = value;
    }


    //
    // if it doesn't => incert
    //    - check capacity and evict if over
    // if it does => update to the front of the list and update the value
    //
  }

  get(key: K): V | undefined {

    // check the cache for existance
    const node = this.lookup.get(key);
    if (!node) {
      return undefined;
    }

    // update the value we found and move it to the front 
    this.detach(node);
    this.prepend(node);

    // return out the value found or undefined if not exist
    return node.value;
  }

  private trimCache(): void {
    if (this.length <= this.capacity) {
      return;
    }
    
    const tail = this.tail as Node<V>;
    this.detach(this.tail as Node<V>);

    const key = this.reverseLookup.get(tail) as K;
    this.lookup.delete(key);
    this.reverseLookup.delete(tail);
    this.length--;
  };

  private detach(node: Node<V>) {
    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }

    if (this.head === node) {
      this.head = this.head.next;
    }

    if (this.tail === node) {
      this.tail = this.tail.prev;
    }

    node.next = undefined;
    node.prev = undefined;
  };

  private prepend(node: Node<V>) {
    if (!this.head) {
      this.head = this.tail = node;
      return;
    }

    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  };
}
