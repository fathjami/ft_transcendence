import { Injectable, Logger } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface MessagePayload {
  senderId: number;
  content: string;
  conversationId: number;
}

@Injectable()
export class MessageService {
  private readonly logger = new Logger(MessageService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(messageData: MessagePayload) {
    const { content, conversationId, senderId } = messageData;

    return this.prismaService.message.create({
      data: {
        content,
        conversationId,
        senderId,
      },
      select: {
        id: true,
        isRead: true,
        content: true,
        createdAt: true,
        conversationId: true,
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
            status: true,
          },
        },
      },
    });
  }

  findAll() {
    this.logger.log('Finding all messages');
    return this.prismaService.message.findMany();
  }

  findOne(id: number) {
    this.logger.log(`Finding message with id ${id}`);
    return this.prismaService.message.findUnique({
      where: {
        id,
      },
    });
  }

  findByChatId(conversationId: number) {
    this.logger.log(`Finding messages with conversationId ${conversationId}`);
    return this.prismaService.message.findMany({
      where: {
        conversationId,
      },
      select: {
        content: true,
        createdAt: true,
        sender: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    });
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    this.logger.log(`Updating message with id ${id}`);
    const { content } = updateMessageDto;
    return this.prismaService.message.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });
  }

  remove(id: number) {
    this.logger.log(`Deleting message with id ${id}`);
    return this.prismaService.message.delete({
      where: {
        id,
      },
    });
  }
}
