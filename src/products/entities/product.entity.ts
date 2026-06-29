import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'products'})
export class Product {

    @ApiProperty({
        example: '27cdf21b-569d-4289-822b-e5cc1c6bee32',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    
    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product Title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    title!: string

    
    @ApiProperty({
        example: '0',
        description: 'Product price'
    })
    @Column('float', {
        default: 0,
    })
    price!: number

    
    @ApiProperty({
        example: 'Voluptate excepteur voluptate officia consectetur consectetur sunt eiusmod sint.',
        description: 'Product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description!: string;

    
    @ApiProperty({
        example: 't_Shirt_teslo',
        description: 'Product SLUG - fro SEO',
        uniqueItems: true
    })
    @Column('text', {
        unique: true
    })
    slug!: string;

    
    @ApiProperty({
        example: '10',
        description: 'Product stock',
        default: 0
    })
    @Column('int',{
        default: 0
    })
    stock!: number;

    
    @ApiProperty({
        example: ['M', 'XL', 'XXL'],
        description: 'Product sizes',
    })
    @Column('text', {
        array: true
    })
    sizes!: string[]

    
    @ApiProperty({
        example: 'women',
        description: 'Product gender',
    })
    @Column('text')
    gender!: string;

    
    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags!: string[];

    
    @ApiProperty()
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[];

    
    @ManyToOne(
        () => User,
        (user) => user.product,
        {eager: true}
    )
    user!: User

    @BeforeInsert()
    @BeforeUpdate()
    checkSlugInsert() {
        
        if (!this.slug){
            this.slug = this.title
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');

    }

    @BeforeUpdate()
    checkSlugUpdate() {
        
        if (!this.slug) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '');
    }

}
