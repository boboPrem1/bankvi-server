import { Product } from 'src/products/entity/product.entity';
import { Injectable, Options } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>
    ){}

    async findAll(): Promise<{}> {
        return (await this.productsRepository.find({
            relations: {
                user: true,
                plateform: true
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
        return (await this.productsRepository.find({
            relations:{
                user: true,
                plateform: true
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

    async create(data: Product): Promise<{}> {
        if(data.name && 
            data.price &&
            data.steps &&
            data.img_path &&
            data.user && 
            data.plateform){
                const product = new Product();
                product.name = data.name;
                product.price = data.price;
                product.steps = data.steps;
                product.img_path = data.img_path;
                product.user = data.user;
                product.plateform = data.plateform;
                await this.productsRepository.save(product);
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

    async update(data: Product, id: number): Promise<{}> {
        const keysToUpdate = {
            name: data.name ? data.name : null,
            price: data.price ? data.price : null,
            steps: data.steps ? data.steps : null,
            img_path: data.img_path ? data.img_path : null,
            user: data.user ? data.user : null,
            plateform: data.plateform ? data.plateform : null
        }
        // Updating data ...
        const productToUpdate = await this.productsRepository.findOneBy({id: id});
        keysToUpdate.name ? productToUpdate.name = keysToUpdate.name : productToUpdate.name = productToUpdate.name;
        keysToUpdate.price ? productToUpdate.price = keysToUpdate.price : productToUpdate.price = productToUpdate.price;
        keysToUpdate.steps ? productToUpdate.steps = keysToUpdate.steps : productToUpdate.steps = productToUpdate.steps;
        keysToUpdate.img_path ? productToUpdate.img_path = keysToUpdate.img_path : productToUpdate.img_path = productToUpdate.img_path;
        keysToUpdate.user ? productToUpdate.user = keysToUpdate.user : productToUpdate.user = productToUpdate.user;
        keysToUpdate.plateform ? productToUpdate.plateform = keysToUpdate.plateform : productToUpdate.plateform = productToUpdate.plateform;
        return this.productsRepository.save(productToUpdate).then(() => {
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
        // const userToDelete = await this.productsRepository.findOneBy({id: id});
        // await userToDelete.createQueryBuilder().softDelete()
        return this.productsRepository
        .delete({id: id})
        .then(() => {
            // return this.productsRepository.remove(userToDelete, Options:"").then(() => {
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
