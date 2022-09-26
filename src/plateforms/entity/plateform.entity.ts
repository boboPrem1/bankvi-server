import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Product } from 'src/products/entity/product.entity';

@Entity()
export class Plateform{
    @PrimaryGeneratedColumn()
    id?: number;

    @OneToMany(() => Product, (product) => product.plateform)
    plateform: Plateform[]

    @Column()
    name: string;
    
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated_at: Date;
}