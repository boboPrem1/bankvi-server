import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Plateform } from './entity/plateform.entity';

@Injectable()
export class PlateformsService {
    constructor(
        @InjectRepository(Plateform)
        private plateformRepository: Repository<Plateform>
    ){}

    async findAll(): Promise<{}> {
        return (await this.plateformRepository.find().then((data)=>{
            return {
                status: "Succès",
                data: data
            }
        }).catch((err)=>{
            return {
                status: "Erreur",
                data: err.message
            }
        }));
    }

    async findOne(id: number): Promise<{}> {
        return (await this.plateformRepository.find({
            where:{
                id: id,
            }
        }).then((data)=>{
            return {
                status: "Succès",
                data: data
            }
        }).catch((err)=>{
            return {
                status: "Erreur",
                data: err.message
            }
        }));
    }

    async create(data: Plateform): Promise<{}> {
        if(data.name){
                const plateform = new Plateform();
                plateform.name = data.name;
                await this.plateformRepository.save(plateform);
            return {
                status: "Success",
                message: `Nouvel utilisateur créé avec succès !`
            }
        } else {
            return {
                status: "Error",
                message: "Data not posted"
            }
        }
    }

    async update(data: Plateform, id: number): Promise<{}> {
        const keysToUpdate = {
            name: data.name ? data.name : null
        }
        // Updating data ...
        const plateformToUpdate = await this.plateformRepository.findOneBy({id: id});
        keysToUpdate.name ? plateformToUpdate.name = keysToUpdate.name : plateformToUpdate.name = plateformToUpdate.name;
        return this.plateformRepository.save(plateformToUpdate).then(() => {
            return {
                status: "success",
                message: "Données mises à jour avec succès ..."
            }
        }).catch((err) => {
            return {
                status: "Erreur",
                message: err.message
            }
        })

    }

    async delete(id: number): Promise<{}> {
        // const userToDelete = await this.plateformRepository.findOneBy({id: id});
        // await userToDelete.createQueryBuilder().softDelete()
        return this.plateformRepository
        .delete({id: id})
        .then(() => {
            // return this.plateformRepository.remove(plateformToDelete, Options:"").then(() => {
            return {
                status: "Succès",
                message: "Supression effectuée avec succès"
            };
        }).catch((err)=>{
            return {
                status: 'Erreur',
                message: err.message
            };
        })
    }
}