import { Product } from './../../products/entity/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Echelon } from 'src/echelons/entity/echelon.entity';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({unique: true})
    tel: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    lastname: string;

    @Column()
    firstname: string;

    @Column({unique: true, nullable: true})
    email?: string;

    @Column({
        type: 'enum',
        enum: [1,2,3
        ],
        default: 1
    })
    role: number;
    
    @OneToMany(() => Product, (product) => product.user)
    product: Product[]
    
    @OneToMany(() => Echelon, (echelon) => echelon.user)
    echelon: Echelon[]

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated_at: Date;
}