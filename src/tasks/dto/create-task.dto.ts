import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'The name must contain a minimum of three characters',
  })
  @MaxLength(15, {
    message: 'The name should not be more than fifteen characters',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, {
    message: 'The description must contain a minimum of five characters',
  })
  @MaxLength(50, {
    message: 'The description should not be more than fifty characters',
  })
  description: string;

  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Priority must be at least 1' })
  @Max(10, { message: 'Priority must be at most 10' })
  priority: number;
}
