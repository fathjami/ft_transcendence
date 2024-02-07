import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { User } from 'src/common/decorators/user.decorator';
import { UserType } from 'src/common/interfaces/user.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UsernameDto } from 'src/users/dto/username.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('friends')
@UseGuards(AuthGuard)
@Controller()
export class FriendsController {
  private readonly logger = new Logger(FriendsController.name);

  constructor(private readonly friendsService: FriendsService) {}

  @Get()
  list(@Query('id', new ParseIntPipe()) id: number, @User() user: UserType) {
    return this.friendsService.listFriendsById(id || user.id);
  }

  @Get('remove')
  async removeFriend(
    @Query('id', new ParseIntPipe()) id: number,
    @User() user: UserType,
  ) {
    return this.friendsService.removeFriend(user.id, id);
  }

  @Get('blocked')
  async listBlockedUsers(@User() user: UserType) {
    this.logger.log(`Listing blocked users for user <${user?.id}>`);
    return this.friendsService.listBlockedUsers(user.id);
  }

  @Get('block')
  async blockUser(@Query() query: UsernameDto, @User() user: UserType) {
    const { username: blockedUsername } = query;

    this.logger.log(
      `User <${user?.username}> is blocking user <${blockedUsername}>`,
    );

    return this.friendsService.blockUser(user.id, blockedUsername);
  }

  @Get('unblock')
  async unblockUser(@Query() query: UsernameDto, @User() user: UserType) {
    const { username: blockedUsername } = query;

    this.logger.log(
      `User <${user?.username}> is unblocking user <${blockedUsername}>`,
    );

    return this.friendsService.unblockUser(user.id, blockedUsername);
  }

  @Get(':id/friends')
  getFriendsById(@Param('id', ParseIntPipe) id: number) {
    return this.friendsService.listFriendsById(id);
  }
}
