import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

import { TicketsService } from './tickets.service';
import { PurchaseTicketDto, CheckInTicketDto } from '@app/common';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post('purchase')
  @ApiOperation({ summary: 'Purchase a ticket for an event' })
  @ApiBody({
    type: PurchaseTicketDto,
    description: 'Ticket purchase payload',
  })
  @ApiCreatedResponse({
    description: 'Ticket purchased successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or purchase request is invalid',
  })
  @ApiForbiddenResponse({
    description: 'Ticket purchase is not allowed',
  })
  @ApiNotFoundResponse({
    description: 'Event not found',
  })
  purchase(
    @Body() purchaseDto: PurchaseTicketDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.ticketsService.purchase(purchaseDto, req.user.userId);
  }

  @Get('my-tickets')
  @ApiOperation({ summary: 'Get current user tickets' })
  @ApiOkResponse({
    description: 'Returns all tickets purchased by the authenticated user',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  findMyTickets(@Request() req: { user: { userId: string } }) {
    return this.ticketsService.findMyTickets(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ticket by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'Ticket ID (UUID)',
  })
  @ApiOkResponse({
    description: 'Returns ticket details',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ticket ID format',
  })
  @ApiNotFoundResponse({
    description: 'Ticket not found',
  })
  @ApiForbiddenResponse({
    description: 'You do not have access to this ticket',
  })
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.ticketsService.findOne(id, req.user.userId);
  }

  @Post(':id/cancel')
  @ApiOperation({ summary: 'Cancel a ticket' })
  @ApiParam({
    name: 'id',
    type: String,
    format: 'uuid',
    description: 'Ticket ID (UUID)',
  })
  @ApiOkResponse({
    description: 'Ticket cancelled successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Invalid ticket ID format',
  })
  @ApiNotFoundResponse({
    description: 'Ticket not found',
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to cancel this ticket',
  })
  cancel(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.ticketsService.cancel(id, req.user.userId);
  }

  @Post('check-in')
  @ApiOperation({ summary: 'Check in a ticket at event entrance' })
  @ApiBody({
    type: CheckInTicketDto,
    description: 'Ticket check-in payload',
  })
  @ApiOkResponse({
    description: 'Ticket checked in successfully',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized. Invalid or missing JWT token',
  })
  @ApiBadRequestResponse({
    description: 'Validation failed or ticket cannot be checked in',
  })
  @ApiNotFoundResponse({
    description: 'Ticket not found',
  })
  @ApiForbiddenResponse({
    description: 'You do not have permission to check in this ticket',
  })
  checkIn(
    @Body() checkInDto: CheckInTicketDto,
    @Request() req: { user: { userId: string } },
  ) {
    return this.ticketsService.checkIn(checkInDto, req.user.userId);
  }

  @Get('event/:eventId')
  @ApiOperation({ summary: 'Get all tickets for a specific event' })
  @ApiParam({
    name: 'eventId',
    type: String,
    format: 'uuid',
    description: 'Event ID (UUID)',
  })
  @ApiOkResponse({
    description: 'Returns all tickets for the specified event',
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
    description: 'You do not have permission to view tickets for this event',
  })
  findEventTickets(
    @Param('eventId', ParseUUIDPipe) eventId: string,
    @Request() req: { user: { userId: string } },
  ) {
    return this.ticketsService.findEventTickets(eventId, req.user.userId);
  }
}
