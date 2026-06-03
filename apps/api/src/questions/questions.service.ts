import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuestionDto) {
    const teacher = await this.prisma.teacher.upsert({
      where: {
        email: data.teacherEmail,
      },
      update: {
        name: data.teacherName,
      },
      create: {
        name: data.teacherName,
        email: data.teacherEmail,
      },
    });

    return this.prisma.question.create({
      data: {
        category: data.category,
        question: data.question,
        answer: data.answer,
        pointValue: data.pointValue,
        teacherId: teacher.id,
      },
      include: {
        teacher: true,
      },
    });
  }

  async findAll() {
    return this.prisma.question.findMany({
      include: {
        teacher: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
