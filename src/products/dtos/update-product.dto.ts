export class UpdateProductDto {
    name?: string;        // El ? significa que puede venir o no
    description?: string;
    price?: number;
    stock?: number;
}