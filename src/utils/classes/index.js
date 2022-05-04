// Можно использовать бибилотеку classnames либо дополнять этот класс

export default class Classes {
  static join(classes) {
    return [...classes].join(' ').trim();
  }
}
