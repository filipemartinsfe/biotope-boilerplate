
interface Attribute {
  value?: string;
}

type DataType = string | number | boolean | object;

// tslint:disable-next-line:no-any
let isNumeric: (value: any) => boolean;

export abstract class StaticComponent {
  protected static globalName: string;

  public static register(jquery: JQueryStatic) {
    if (!isNumeric) {
      isNumeric = jquery.isNumeric;
    }
    const childClass = this;
    // tslint:disable-next-line:no-any
    jquery.fn[childClass.globalName] = function(...args: any[]) {
      const element = this as JQuery;
      if (!element.data(childClass.globalName) && element.length) {
        // tslint:disable-next-line:no-any
        element.data(childClass.globalName, new (childClass as any)(element[0], ...args));
      }
    };
  }

  protected getDataAttr(element: HTMLElement, atributeName: string): DataType {
    const attribute: Attribute = element.attributes.getNamedItem(`data-${atributeName}`) || {};
    let parsedValue: DataType = attribute.value;
    if (isNumeric(attribute.value)) {
      parsedValue = +(attribute.value);
    } else {
      try {
        parsedValue = JSON.parse(attribute.value);
      } catch (_) {}
    }
    return parsedValue;
  }
}
