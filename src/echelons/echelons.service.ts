import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Echelon } from './entity/echelon.entity';

@Injectable()
export class EchelonsService {

    constructor(
        @InjectRepository(Echelon)
        private echelonsRepository: Repository<Echelon>
    ){}

    async findAll(): Promise<{}> {
        return (await this.echelonsRepository.find({
            relations: {
                user: true,
                product: true
            },
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

    async findOne(id: number): Promise<{}> {
        return (await this.echelonsRepository.find({
            relations:{
                user: true,
                product: true
            },
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

    async create(data: Echelon): Promise<{}> {
        if(data.user &&
            data.product &&
            data.payement_method &&
            data.progress_state){
                const echelon = new Echelon();
                echelon.user = data.user;
                echelon.product = data.product;
                echelon.payement_method = data.payement_method;
                echelon.done_steps = data.done_steps ? data.done_steps : 0;
                echelon.payed = data.payed ? data.payed : 0;
                echelon.progress_state = data.progress_state;
                await this.echelonsRepository.save(echelon);
            return {
                status: "Success",
                message: `Nouvel utilisateur créé avec succès !`
            }
        } else {
            return {
                status: "Error",
                message: "Data not posteda"
            }
        }
    }

    async update(data: Echelon, id: number): Promise<{}> {
        const keysToUpdate = {
            user: data.user ? data.user : null,
            product: data.product ? data.product : null,
            payement_method: data.payement_method ? data.payement_method : null,
            done_steps: data.done_steps ? data.done_steps : null,
            payed: data.payed ? data.payed : null,
            progress_state: data.progress_state ? data.progress_state : null
        }
        // Updating data ...
        const productToUpdate = await this.echelonsRepository.findOneBy({id: id});
        keysToUpdate.user ? productToUpdate.user = keysToUpdate.user : productToUpdate.user = productToUpdate.user;
        keysToUpdate.product ? productToUpdate.product = keysToUpdate.product : productToUpdate.product = productToUpdate.product;
        keysToUpdate.payement_method ? productToUpdate.payement_method = keysToUpdate.payement_method : productToUpdate.payement_method = productToUpdate.payement_method;
        keysToUpdate.done_steps ? productToUpdate.done_steps = keysToUpdate.done_steps : productToUpdate.done_steps = productToUpdate.done_steps;
        keysToUpdate.payed ? productToUpdate.payed = keysToUpdate.payed : productToUpdate.payed = productToUpdate.payed;
        keysToUpdate.progress_state ? productToUpdate.progress_state = keysToUpdate.progress_state : productToUpdate.progress_state = productToUpdate.progress_state;
        return this.echelonsRepository.save(productToUpdate).then(() => {
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
        // const userToDelete = await this.echelonsRepository.findOneBy({id: id});
        // await userToDelete.createQueryBuilder().softDelete()
        return this.echelonsRepository
        .delete({id: id})
        .then(() => {
            // return this.echelonsRepository.remove(userToDelete, Options:"").then(() => {
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