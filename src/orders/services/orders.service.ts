// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private itemsRepository: Repository<OrderItem>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const total = createOrderDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // 2. Crear el pedido con el total calculado
    const order = this.ordersRepository.create({
      status: createOrderDto.status || OrderStatus.PENDING,
      total,
    });

    const savedOrder = await this.ordersRepository.save(order);

    const items = createOrderDto.items.map((item) =>
      this.itemsRepository.create({
        ...item,
        order: savedOrder,
      }),
    );
    savedOrder.items = await this.itemsRepository.save(items);
    return savedOrder;
  }
}
