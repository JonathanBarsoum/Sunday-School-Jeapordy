import { IsEmail, IsInt, IsString, Min } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  teacherName: string;

  @IsEmail()
  teacherEmail: string;

  @IsString()
  category: string;

  @IsString()
  question: string;

  @IsString()
  answer: string;

  @IsInt()
  @Min(1)
  pointValue: number;
}
