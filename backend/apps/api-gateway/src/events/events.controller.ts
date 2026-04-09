import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from '@app/common';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all public events' })
  @ApiOkResponse({
    description: 'Returns a list of all public events',
  })
  findAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('my-events')
  @ApiOperation({ summary: 'Get current user events' })
  @ApiOkResponse({
    description: 'Returns all events created by the authenticated user',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  findMyEvents(@Request() req: { user: { userId: string } }) {
    return this.eventsService.findMyEvents(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'Event ID (UUID)',
  })
  @ApiOkResponse({
    description: 'Returns event details',
  })
  @ApiBadRequestResponse({
    description: 'Invalid event ID format',
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiBody({
    type: CreateEventDto,
    description: 'Event creation payload',
  })
  @ApiCreatedResponse({
    description: 'Event created successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed for request body',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to create event',
  })
  create(
    @Body() createEventDto: CreateEventDto,
    @Request() req: { user: { userId: string; role?: string } },
  ) {
    return this.eventsService.create(
      createEventDto,
      req.user.userId,
      req.user.role || 'USER',
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing event' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'Event ID (UUID)',
  })
  @ApiBody({
    type: UpdateEventDto,
    description: 'Event update payload',
  })
  @ApiOkResponse({
    description: 'Event updated successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Invalid event ID or validation failed',
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to update this event',
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Request() req: { user: { userId: string; role?: string } },
  ) {
    return this.eventsService.update(
      id,
      updateEventDto,
      req.user.userId,
      req.user.role || 'USER',
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post(':id/publish')
  @ApiOperation({ summary: 'Publish an event' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'Event ID (UUID)',
  })
  @ApiOkResponse({
    description: 'Event published successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Invalid event ID format',
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to publish this event',
  })
  publish(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { userId: string; role?: string } },
  ) {
    return this.eventsService.publish(
      id,
      req.user.userId,
      req.user.role || 'USER',
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel an event' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'Event ID (UUID)',
  })
  @ApiOkResponse({
    description: 'Event cancelled successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Invalid event ID format',
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
  })
  @ApiForbiddenResponse({
    description: 'User does not have permission to cancel this event',
  })
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { userId: string; role?: string } },
  ) {
    return this.eventsService.cancel(
      id,
      req.user.userId,
      req.user.role || 'USER',
    );
  }
}
