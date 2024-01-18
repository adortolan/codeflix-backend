import { Category } from "../../category/domain/category.entity";
import { IRepository } from "./repository/repository-interface";
import { Uuid } from "./value-objects/uuid.vo";

export interface ICategory extends IRepository<Category, Uuid> {}
