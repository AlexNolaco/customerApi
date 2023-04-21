import {
    IsNumber,
    IsString,
    IsNotEmpty
} from "class-validator";

export class updateCustomerRequestModel {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsNumber()
    @IsNotEmpty()
    document: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}