import { ApiProperty } from '@nestjs/swagger';
import {
    IsNumber,
    IsString,
    IsNotEmpty
} from 'class-validator';

export class UpdateCustomerRequestModel {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        default: '165ec741-53c4-4034-adac-962c70324979'     
    })
    id: string;

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