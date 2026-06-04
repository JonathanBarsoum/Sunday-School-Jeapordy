import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateQuestionDto) {
    const user = await this.prisma.user.upsert({
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
        createdById: user.id,
      },
      include: {
        createdBy: true,
      },
    });
  }

  async findAll() {
    return this.prisma.question.findMany({
      include: {
        createdBy: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
