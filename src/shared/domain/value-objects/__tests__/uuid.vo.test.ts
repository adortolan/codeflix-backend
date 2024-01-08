import { Uuid, InvalidUuidError } from "../uuid.vo";
import { validate as uuidValidate } from "uuid";

describe("Uuid unit test", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

  test("Shoul throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid("Invalid uuid");
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  test("Should be created uuid valid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
    expect(uuidValidate(uuid.id)).toBe(true);
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("Should be accept valid uuid", () => {
    const uuid = new Uuid("c3e9b0d0-7b6f-4a8e-8e1f-3f9e6a2f7e3d");
    expect(uuid.id).toEqual("c3e9b0d0-7b6f-4a8e-8e1f-3f9e6a2f7e3d");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});
