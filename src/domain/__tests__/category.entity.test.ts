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
});
