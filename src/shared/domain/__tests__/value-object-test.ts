import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

class ComplexValueObject extends ValueObject {
  constructor(readonly prop1: string, readonly prop2: number) {
    super();
  }
}

describe("ValueObject unit test", () => {
  test("Should be equals", () => {
    const ObjectValue1 = new StringValueObject("test");
    const ObjectValue2 = new StringValueObject("test");
    expect(ObjectValue1.equals(ObjectValue2)).toBe(true);

    const ComplexObject1 = new ComplexValueObject("test", 1);
    const ComplexObject2 = new ComplexValueObject("test", 1);
    expect(ComplexObject1.equals(ComplexObject2)).toBe(true);
  });

  test("Should not be equals", () => {
    const ObjectValue1 = new StringValueObject("test");
    const ObjectValue2 = new StringValueObject("test1");
    expect(ObjectValue1.equals(ObjectValue2)).toBe(false);

    const ComplexObject1 = new ComplexValueObject("test", 1);
    const ComplexObject2 = new ComplexValueObject("test1", 2);
    expect(ComplexObject1.equals(ComplexObject2)).toBe(false);
  });
});
