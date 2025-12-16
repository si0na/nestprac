import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class AppService {

  async getUser() {
    try {
   
      const user = await this.fetchFromDatabase();

      if (!user) {
        throw new NotFoundException('User record not found in database');
      }

      return user;

    } catch (error) {

   
      if (error instanceof NotFoundException) {
        throw error;
      }


      throw new InternalServerErrorException(
        'Failed to fetch user due to database error',
      );
    }
  }

  private async fetchFromDatabase() {
 
    const random = Math.floor(Math.random() * 3);

    if (random === 0) {
      return null; 
    }

    if (random === 1) {
      throw new Error('DB connection timeout');
    }

    return { id: 1, name: 'John' };
  }
}
