import {AssetStatus} from "./asset.model";
import {IsEnum, IsNotEmpty, IsOptional} from "class-validator";

export class CreateAssetDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}

export class UpdateStatusDto {
    @IsEnum(AssetStatus)
    status: AssetStatus
}

export class GetAssetFilterDto {
    @IsEnum(AssetStatus)
    @IsOptional()
    status?: AssetStatus;
    @IsNotEmpty()
    @IsOptional()
    search?: string;
}
