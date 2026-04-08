import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { LoginDto, RegisterDto } from '@app/common/dto';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @ApiOperation({ summary: 'Login user and get JWT access token' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @Get('profile')
  @SkipThrottle()
  getProfile(@Headers('authorization') authorization: string) {
    return this.authService.getProfile(authorization);
  }

  @Get('health')
  health() {
    return this.authService.healths();
  }
}
