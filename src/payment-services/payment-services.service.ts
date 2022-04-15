import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentServiceInput } from './dto/create-payment-service.input';
import { PaymentService } from './entities/payment-service.entity';

@Injectable()
export class PaymentServiceService {
  constructor(
    @InjectRepository(PaymentService)
    private readonly paymentServiceRepository: Repository<PaymentService>,
  ) {}

  async create(
    createPaymentServiceInput: CreatePaymentServiceInput,
  ): Promise<PaymentService> {
    const paymentService = this.paymentServiceRepository.create({
      ...createPaymentServiceInput,
    });

    const savedPaymentService = await this.paymentServiceRepository.save(
      paymentService,
    );
    return savedPaymentService;
  }

  findAll() {
    return this.paymentServiceRepository.find();
  }

  findOne(id: string) {
    return this.paymentServiceRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<number> {
    const result = await this.paymentServiceRepository.delete(id);
    return result.affected || 0;
  }
}
