import { Controller, Get, Post } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @Get('register')
  public register() {
    console.log('124');
    return this.authServiceService.simulateUserRegistration();
  }
}
