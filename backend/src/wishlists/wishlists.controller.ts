import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  createOne(@Req() req, @Body() createWishlistDto: CreateWishlistDto) {
    return this.wishlistsService.createOne(createWishlistDto, req.user.id);
  }

  @Get()
  findAll(@Req() req) {
    return this.wishlistsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Req() req, @Param('id') id: string) {
    return this.wishlistsService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  updateOne(
    @Req() req,
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return this.wishlistsService.updateOne(+id, updateWishlistDto, req.user.id);
  }

  @Delete(':id')
  removeOne(@Req() req, @Param('id') id: string) {
    return this.wishlistsService.removeOne(+id, req.user.id);
  }
}
