import {
    IsNumber,
    IsString,
    IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerRequestModel {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        type: Number,
        description: 'This is a required property',
        default: 123456     
    })
    document: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        default: 'Alex'      
    })
    name: string;
}