import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { PartialUpdateProductDto } from '../dtos/partial-update-product.dto';
import { ProductResponseDto } from '../dtos/product-response.dto';
import { ProductEntity } from '../entities/product.entity';

export class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public stock: number,
    public createdAt: Date,
  ) {
    if (!name || name.length < 3) {
      throw new Error('Nombre inválido');
    }

    if (price < 0) {
      throw new Error('Precio inválido');
    }

    if (stock < 0) {
      throw new Error('Stock inválido');
    }
  }

  static fromDto(dto: CreateProductDto): Product {
    return new Product(0, dto.name, dto.price, dto.stock, new Date());
  }

  static fromEntity(entity: ProductEntity): Product {
    return new Product(
      entity.id,
      entity.name,
      entity.price,
      entity.stock,
      entity.createdAt,
    );
  }

  toEntity(): ProductEntity {
    const entity = new ProductEntity();
    if (this.id > 0) entity.id = this.id;
    entity.name = this.name;
    entity.price = this.price;
    entity.stock = this.stock;
    return entity;
  }

  toResponseDto(): ProductResponseDto {
    return {
      id: this.id,
      name: this.name,
      price: this.price,
      stock: this.stock,
      createdAt: this.createdAt?.toISOString(),
    };
  }

  update(dto: UpdateProductDto): Product {
    this.name = dto.name;
    this.price = dto.price;
    this.stock = dto.stock;
    return this;
  }

  partialUpdate(dto: PartialUpdateProductDto): Product {
    if (dto.name !== undefined) {
      this.name = dto.name;
    }

    if (dto.price !== undefined) {
      if (dto.price < 0) {
        throw new Error('Precio inválido');
      }
      this.price = dto.price;
    }

    if (dto.stock !== undefined) {
      if (dto.stock < 0) {
        throw new Error('Stock inválido');
      }
      this.stock = dto.stock;
    }

    return this;
  }
}
