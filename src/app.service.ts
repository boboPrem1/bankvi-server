import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Bievenue sur l'Api de BankVi,
    D'ici vous pouvez créer un compte`;
  }
}
