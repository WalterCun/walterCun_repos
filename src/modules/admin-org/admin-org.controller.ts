import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminOrgService } from './admin-org.service';
import { CreateAdminOrgDto } from './dto/create-admin-org.dto';
import { UpdateAdminOrgDto } from './dto/update-admin-org.dto';

@Controller('admin-org')
export class AdminOrgController {
  constructor(private readonly adminOrgService: AdminOrgService) {}

  @Post()
  create(@Body() createAdminOrgDto: CreateAdminOrgDto) {
    return this.adminOrgService.create(createAdminOrgDto);
  }

  @Get()
  findAll() {
    return this.adminOrgService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminOrgService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminOrgDto: UpdateAdminOrgDto) {
    return this.adminOrgService.update(+id, updateAdminOrgDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminOrgService.remove(+id);
  }
}
