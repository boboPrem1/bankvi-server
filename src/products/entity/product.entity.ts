import { Echelon } from 'src/echelons/entity/echelon.entity';
import { Plateform } from 'src/plateforms/entity/plateform.entity';
import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, ManyToOne, OneToMany, DeleteDateColumn } from 'typeorm';

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column({type: 'float'})
    price: number;

    @Column()
    steps: number;

    @Column()
    img_path: string;

    @OneToMany(() => Echelon, (echelon) => echelon.product, {})
    echelon: Echelon[]

    @ManyToOne(() => User, (user) => user.id, {nullable: false, onDelete: "RESTRICT", onUpdate: "CASCADE"})
    user: User;

    @ManyToOne(() => Plateform, (plateform) => plateform.id, {nullable: false, onDelete: "RESTRICT", onUpdate: "CASCADE"})
    plateform: Plateform;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP"})
    updated_at: Date;
}