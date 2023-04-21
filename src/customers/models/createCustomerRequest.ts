import {
    IsNumber,
    IsString,
    IsNotEmpty
} from "class-validator";

export class CreateCustomerRequestModel {
    @IsNumber()
    @IsNotEmpty()
    document: number;

    @IsString()
    @IsNotEmpty()
    name: string;
}