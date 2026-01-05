import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';

export class ProductMapper {
  static fromCreateDto(dto: CreateProductDto): ProductEntity {
    const entity = new ProductEntity();
    entity.name = dto.name;
    entity.price = dto.price;
    entity.stock = dto.stock;
    return entity;
  }

  static fromUpdateDto(
    entity: ProductEntity,
    dto: UpdateProductDto,
  ): ProductEntity {
    entity.name = dto.name;
    entity.price = dto.price;
    entity.stock = dto.stock;
    return entity;
  }
}
