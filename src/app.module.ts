import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { HitsModule } from './modules/hits/hits.module';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './commons/services/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './middleware/guards/roles.guard';
import { UsersGeneralService } from './modules/users/services/users-general/users-general.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    UsersModule,
    HitsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
