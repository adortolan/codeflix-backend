import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category.entity Unit tests", () => {
  let validateSpy: any;
  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

  test("should create a category with name", () => {
    const category = new Category({ name: "Category" });

    expect(category.name).toBe("Category");
  });

  test("should create a category with name and description", () => {
    const category = new Category({
      name: "Category",
      description: "Category description",
    });

    expect(category).toMatchObject({
      name: "Category",
      description: "Category description",
    });
  });

  test("should create a category name, description is active ", () => {
    const category = new Category({
      name: "Category",
      description: "Category description",
      is_active: true,
    });

    expect(category.name).toBe("Category");
    expect(category.description).toBe("Category description");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  it("should be use form create", () => {
    const category = Category.create({
      name: "Categ01",
      description: "Description categ",
      is_active: true,
    });
    expect(category).toMatchObject({
      name: "Categ01",
      description: "Description categ",
      is_active: true,
    });
  });

  it("should be change name", () => {
    const category = Category.create({
      name: "Categ01",
      description: "Description categ",
      is_active: true,
    });

    category.changeName("Categ03");

    expect(category.name).toBe("Categ03");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("should be change description", () => {
    const category = Category.create({
      name: "Categ01",
      description: "Description categ",
      is_active: true,
    });

    category.changeDescription("New description");

    expect(category.description).toBe("New description");
    expect(validateSpy).toHaveBeenCalledTimes(2);
  });

  it("should be activate", () => {
    const category = Category.create({
      name: "Categ01",
      description: "Description categ",
      is_active: false,
    });

    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  it("should be deactivate", () => {
    const category = Category.create({
      name: "Categ01",
      description: "Description categ",
      is_active: true,
    });

    category.deactivate();

    expect(category.is_active).toBeFalsy();
  });

  it("should be return toJson", () => {
    const category = new Category({
      name: "Category",
      description: "Category description",
      is_active: true,
    });

    const date = new Date();

    expect(category.toJSON()).toMatchObject({
      name: "Category",
      description: "Category description",
      is_active: true,
      created_at: date,
    });
  });

  describe("Category_id field", () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid() },
    ];

    test.each(arrange)("id = %j", ({ category_id }) => {
      const category = new Category({
        name: "Movie",
        category_id: category_id as any,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      if (category_id instanceof Uuid) {
        expect(category.category_id).toBe(category_id);
      }
    });
  });
  describe("Category Validator", () => {
    describe("create command", () => {
      test("should an invalid category with name property", () => {
        const arrange = [];

        expect(() => Category.create({ name: null })).containsErrorMessages({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        });

        expect(() => Category.create({ name: "" })).containsErrorMessages({
          name: ["name should not be empty"],
        });

        expect(() => Category.create({ name: 5 as any })).containsErrorMessages(
          {
            name: [
              "name must be a string",
              "name must be shorter than or equal to 255 characters",
            ],
          }
        );

        expect(() =>
          Category.create({ name: "t".repeat(256) })
        ).containsErrorMessages({
          name: ["name must be shorter than or equal to 255 characters"],
        });
      });

      it("should a invalid category using description property", () => {
        expect(() =>
          Category.create({ description: 5 } as any)
        ).containsErrorMessages({
          description: ["description must be a string"],
        });
      });

      it("should a invalid category using is_active property", () => {
        expect(() =>
          Category.create({ is_active: 5 } as any)
        ).containsErrorMessages({
          is_active: ["is_active must be a boolean value"],
        });
      });
    });

    describe("changeName method", () => {
      it("should a invalid category using name property", () => {
        const category = Category.create({ name: "Movie" });
        expect(() => category.changeName(null)).containsErrorMessages({
          name: [
            "name should not be empty",
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        });

        expect(() => category.changeName("")).containsErrorMessages({
          name: ["name should not be empty"],
        });

        expect(() => category.changeName(5 as any)).containsErrorMessages({
          name: [
            "name must be a string",
            "name must be shorter than or equal to 255 characters",
          ],
        });

        expect(() =>
          category.changeName("t".repeat(256))
        ).containsErrorMessages({
          name: ["name must be shorter than or equal to 255 characters"],
        });
      });
    });

    describe("changeDescription method", () => {
      it("should a invalid category using description property", () => {
        const category = Category.create({ name: "Movie" });
        expect(() =>
          category.changeDescription(5 as any)
        ).containsErrorMessages({
          description: ["description must be a string"],
        });
      });
    });
  });
});
