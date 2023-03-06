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
    
  constructor() {
    this.length = 0;
    this.head = this.tail = undefined;
    this.lookup = new Map<K, Node<V>>();
    this.reverseLookup = new Map<Node<V>, K>();
  }

  update(key: K, value: V): void {

    // does it exist?
    //
    // if it doesn't => incert
    //    - check capacity and evict if over
    // if it does => update to the front of the list and update the value
    //
  }

  get(key: K): V | undefined {

    // check the cache for existance

    // update the value we found and move it to the front 

    // return out the value found or undefined if not exist
  }

}
