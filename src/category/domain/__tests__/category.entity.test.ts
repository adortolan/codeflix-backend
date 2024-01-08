import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category.entity Unit tests", () => {
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
  });

  it("should be change description", () => {
    const category = Category.create({
      name: "Categ01",
      description: "Description categ",
      is_active: true,
    });

    category.changeDescription("New description");

    expect(category.description).toBe("New description");
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

    expect(category.toJson()).toMatchObject({
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
});
