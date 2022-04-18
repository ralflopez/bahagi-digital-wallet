import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountriesService } from 'src/countries/countries.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import * as uuid from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly countryService: CountriesService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const country = await this.countryService.findOne(
      createUserInput.countryId,
    );
    if (!country) throw new Error('Invalid country id');

    const userUUID = uuid.v4();

    const user = this.usersRepository.create({
      ...createUserInput,
      id: userUUID,
    });

    const savedUser = await this.usersRepository.save(user);
    return savedUser;
  }

  async findAll() {
    const users = await this.usersRepository.find({
      relations: {
        country: {
          currency: true,
        },
      },
    });
    return users;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        country: {
          currency: true,
        },
      },
    });

    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
      relations: {
        country: {
          currency: true,
        },
      },
    });

    return user;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.usersRepository.save({
      id,
      ...updateUserInput,
    });
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
    return id;
  }
}
