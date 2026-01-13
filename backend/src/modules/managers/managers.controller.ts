import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ManagersService } from './managers.service';
import {
  CreateManagerDto,
  UpdateManagerDto,
  ListManagersQueryDto,
} from './dto/create-manager.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Audit } from '../../common/decorators/audit.decorator';
import { Role } from '../../common/enums/roles.enum';

@ApiTags('managers')
@ApiBearerAuth()
@Controller('managers')
export class ManagersController {
  constructor(private managersService: ManagersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'List all managers with pagination' })
  @ApiResponse({ status: 200, description: 'Managers list' })
  async findAll(@Query() query: ListManagersQueryDto) {
    return this.managersService.findAll(query);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Get manager by ID' })
  @ApiResponse({ status: 200, description: 'Manager found' })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  async findById(@Param('id') id: string) {
    return this.managersService.findById(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @Audit({ action: 'CREATE', resource: 'manager' })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new manager' })
  @ApiResponse({ status: 201, description: 'Manager created' })
  @ApiResponse({ status: 400, description: 'Email already registered' })
  async create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @Audit({ action: 'UPDATE', resource: 'manager' })
  @ApiOperation({ summary: 'Update manager' })
  @ApiResponse({ status: 200, description: 'Manager updated' })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  async update(
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @Audit({ action: 'DELETE', resource: 'manager' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete manager' })
  @ApiResponse({ status: 204, description: 'Manager deleted' })
  @ApiResponse({ status: 404, description: 'Manager not found' })
  async delete(@Param('id') id: string) {
    return this.managersService.delete(id);
  }

  @Patch(':id/activate')
  @Roles(Role.ADMIN)
  @Audit({ action: 'UPDATE', resource: 'manager' })
  @ApiOperation({ summary: 'Activate manager' })
  @ApiResponse({ status: 200, description: 'Manager activated' })
  async activateManager(@Param('id') id: string) {
    return this.managersService.activateManager(id);
  }

  @Patch(':id/deactivate')
  @Roles(Role.ADMIN)
  @Audit({ action: 'UPDATE', resource: 'manager' })
  @ApiOperation({ summary: 'Deactivate manager' })
  @ApiResponse({ status: 200, description: 'Manager deactivated' })
  async deactivateManager(@Param('id') id: string) {
    return this.managersService.deactivateManager(id);
  }
}
