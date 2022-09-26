import { Product } from 'src/products/entity/product.entity';
import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Echelon{
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(() => User, (user) => user.id, {nullable: false, onDelete: "RESTRICT", onUpdate: "CASCADE"})
    user: User;
    
    @ManyToOne(() => Product, (product) => product.id, {nullable: false, onDelete: "RESTRICT", onUpdate: "CASCADE"})
    product: Product;

    @Column({
        type: 'enum',
        enum: ['TMoney','Flooz'],
        default: 'TMoney'
    })
    payement_method: string;

    @Column({default: 0})
    done_steps: number;

    @Column({type: 'float', default: 0})
    payed: number;

    @Column({
        type: 'enum',
        enum: ['todo','doing', 'done'],
        default: 'todo'
    })
    progress_state: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated_at: Date;
}