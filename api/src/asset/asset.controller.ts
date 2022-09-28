import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {AssetService} from "./asset.service";
import {CreateAssetDto, GetAssetFilterDto, UpdateStatusDto} from "./asset.dto";
import {Asset} from "./asset.model";
import {GetUser} from "../auth/get-user.decorator";
import {UserEntity} from "../users/user.entity";

@Controller('asset')
export class AssetController {
    constructor(private assetService: AssetService) {}

    @Get()
    get(@Query() filterDto: GetAssetFilterDto): Promise<Asset[]> {
        return this.assetService.getAllAssets(filterDto);
    }

    @Get('zalupa')
    async zalupa() {
        return 1;
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.assetService.getAssetById(id);
    }

    @Post()
    async createAssetDto(
        @Body() assetDto:CreateAssetDto,
        @GetUser() user: UserEntity
    ) {
        return this.assetService.addAsset(assetDto);
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.assetService.delete(id);
    }

    @Patch(":id/status")
    patchStatus(
        @Param('id') id: string,
        @Body() updateStatus:UpdateStatusDto
    ) {
        return this.assetService.updateStatus(id, updateStatus.status);
    }

}
