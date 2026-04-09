import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'Tech Conference 2026',
    description: 'Event title',
    maxLength: 255,
  })
  @IsString({ message: 'Title must be a string' })
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({
    example: 'Conference about NestJS, Kafka, and microservices',
    description: 'Optional event description',
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: '2026-05-15T18:00:00.000Z',
    description: 'Event date in ISO 8601 format',
  })
  @IsDateString({}, { message: 'Date must be a valid date string' })
  @IsNotEmpty({ message: 'Date is required' })
  date: string;

  @ApiProperty({
    example: 'Da Nang, Vietnam',
    description: 'Event location',
    maxLength: 255,
  })
  @IsString({ message: 'Location must be a string' })
  @IsNotEmpty({ message: 'Location is required' })
  @MaxLength(255)
  location: string;

  @ApiProperty({
    example: 100,
    description: 'Maximum number of attendees',
    minimum: 1,
  })
  @IsInt({ message: 'Capacity must be an integer' })
  @Min(1, { message: 'Capacity must be at least 1' })
  capacity: number;

  @ApiPropertyOptional({
    example: 25,
    description: 'Ticket price for the event',
    minimum: 0,
    default: 0,
  })
  @IsInt({ message: 'Price must be an integer' })
  @Min(0, { message: 'Price must be at least 0' })
  @IsOptional()
  price?: number;
}
