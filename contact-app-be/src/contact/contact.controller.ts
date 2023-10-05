import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Logger,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactEntity } from '../database/entity/contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactController {
  private readonly logger = new Logger(this.constructor.name);
  constructor(private readonly contactService: ContactService) {}

  @Get()
  findAll(): Promise<ContactEntity[]> {
    this.logger.log('Retrieving all contacts');
    return this.contactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ContactEntity> {
    this.logger.log(`Retrieving contact by ID: ${id}`);
    return this.contactService.findOne(id);
  }

  @Post()
  create(@Body() contactData: CreateContactDto): Promise<ContactEntity> {
    this.logger.log('Creating a new contact');
    return this.contactService.create(contactData);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() contactData: CreateContactDto,
  ): Promise<ContactEntity> {
    this.logger.log(`Updating contact by ID: ${id}`);
    return this.contactService.update(id, contactData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    this.logger.log(`Deleting contact by ID: ${id}`);
    return this.contactService.remove(id);
  }
}
