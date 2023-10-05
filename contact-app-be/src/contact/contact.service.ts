import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactEntity } from '../database/entity/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  async findAll(): Promise<ContactEntity[]> {
    return this.contactRepository.find();
  }

  async findOne(id: number): Promise<ContactEntity> {
    const contact = await this.contactRepository.findOne({
      where: { id },
    });

    if (!contact) {
      throw new NotFoundException(`Contact with id ${id} not found!`);
    }

    return contact;
  }

  async create(contactData: CreateContactDto): Promise<ContactEntity> {
    return this.contactRepository.save(contactData);
  }

  async update(
    id: number,
    contactData: CreateContactDto,
  ): Promise<ContactEntity> {
    await this.findOne(id);
    await this.contactRepository.update(id, contactData);

    return this.contactRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.contactRepository.delete(id);
  }
}
