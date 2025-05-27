import { IsNumber, IsPositive } from 'class-validator';
import { OrderItem } from '../entities/order-item.entity';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateOrderDto {
  status: OrderStatus;

  @IsNumber()
  total: number;

  items: OrderItem[];
}
