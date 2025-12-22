import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
    
    // Convierte los datos de entrada + el ID generado en una Entidad completa
    static toEntity(id: number, dto: CreateProductDto): ProductEntity {
        return {
            id: id,
            name: dto.name,
            description: dto.description,
            price: dto.price,
            stock: dto.stock
        };
    }

    // Convierte la entidad interna en lo que quieres mostrar al usuario
    // (A veces quieres ocultar campos internos, aquí es donde filtrarías)
    static toResponse(entity: ProductEntity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            price: entity.price,
            stock: entity.stock
        };
    }
}