import { PartialType } from '@nestjs/mapped-types';
import { ApiProduces } from '@nestjs/swagger';
import { CreateAdminOrgDto } from './create-admin-org.dto';

@ApiProduces()
export class UpdateAdminOrgDto extends PartialType(CreateAdminOrgDto) {}
