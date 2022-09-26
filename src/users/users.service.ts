import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async loginOne(username: string) {
    return await this.usersRepository
      .findOneBy({ username: username })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err.message;
      });
  }

  async findAll(): Promise<{}> {
    return await this.usersRepository
      .find()
      .then((data) => {
        return {
          status: 'Succès',
          data: data,
        };
      })
      .catch((err) => {
        return {
          status: 'Erreur',
          data: err.message,
        };
      });
  }

  async findOne2(username: string): Promise<{}>{
    return await this.usersRepository
        .findOneBy({ username: username })
        .then((data) => {
          return {
            status: 'Succès',
            data: data,
          };
        })
        .catch((err) => {
          return {
            status: 'Erreur',
            data: err.message,
          };
        });
  }

  async findOne(id: number): Promise<{}> {
    return await this.usersRepository
      .findOneBy({ id: id })
      .then((data) => {
        return {
          status: 'Succès',
          data: data,
        };
      })
      .catch((err) => {
        return {
          status: 'Erreur',
          data: err.message,
        };
      });
  }

  async create(data: User): Promise<{}> {
    if (
      data.tel &&
      data.firstname &&
      data.lastname &&
      data.username &&
      data.password &&
      data.role
    ) {
      const user = new User();
      user.tel = data.tel;
      user.username = data.username;
      const saltOrRounds = 10;
      const password = data.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      user.password = hash;
      user.lastname = data.lastname;
      user.firstname = data.firstname;
      user.email = data.email ? data.email : '';
      user.role = data.role;
      await this.usersRepository.save(user);
      return {
        status: 'Success',
        message: `Nouvel utilisateur créé avec succès !`,
      };
    } else {
      return {
        status: 'Error',
        message: 'Data not posted',
      };
    }
  }

  async update(data: User, id: number): Promise<{}> {
    const keysToUpdate = {
      firstname: data.firstname ? data.firstname : null,
      lastname: data.lastname ? data.lastname : null,
      email: data.email ? data.email : null,
      tel: data.tel ? data.tel : null,
      username: data.username ? data.username : null,
      password: data.password ? data.password : null,
    };
    // Updating data ...
    const userToUpdate = await this.usersRepository.findOneBy({ id: id });
    keysToUpdate.firstname
      ? (userToUpdate.firstname = keysToUpdate.firstname)
      : (userToUpdate.firstname = userToUpdate.firstname);
    keysToUpdate.lastname
      ? (userToUpdate.lastname = keysToUpdate.lastname)
      : (userToUpdate.lastname = userToUpdate.lastname);
    keysToUpdate.email
      ? (userToUpdate.email = keysToUpdate.email)
      : (userToUpdate.email = userToUpdate.email);
    keysToUpdate.tel
      ? (userToUpdate.tel = keysToUpdate.tel)
      : (userToUpdate.tel = userToUpdate.tel);
    keysToUpdate.username
      ? (userToUpdate.username = keysToUpdate.username)
      : (userToUpdate.username = userToUpdate.username);
    keysToUpdate.password
      ? (userToUpdate.password = keysToUpdate.password)
      : (userToUpdate.password = userToUpdate.password);
    return this.usersRepository
      .save(userToUpdate)
      .then(() => {
        return {
          status: 'success',
          message: 'Données mises à jour avec succès ...',
        };
      })
      .catch((err) => {
        return {
          status: 'Erreur',
          message: err.message,
        };
      });
  }

  async delete(id: number): Promise<{}> {
    const userToDelete = await this.usersRepository.findOneBy({ id: id });
    return this.usersRepository
      .remove(userToDelete)
      .then(() => {
        return {
          status: 'Succès',
          message: 'Supression effectuée avec succès',
        };
      })
      .catch((err) => {
        return {
          status: 'Erreur',
          message: err.message,
        };
      });
  }
}
