import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminOrgDto } from './create-admin-org.dto';

export class UpdateAdminOrgDto extends PartialType(CreateAdminOrgDto) {}
