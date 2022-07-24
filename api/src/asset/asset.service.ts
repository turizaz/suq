import {Injectable, NotAcceptableException, NotFoundException} from '@nestjs/common';
import {Asset, AssetStatus} from "./asset.model";
import {CreateAssetDto, GetAssetFilterDto} from "./asset.dto";
import {AssetRepository} from "./asset.repository";
import {SelectQueryBuilder, UpdateResult} from "typeorm";
import {AssetEntity} from "./asset.entity";

@Injectable()
export class AssetService {

    constructor(private assetRepository: AssetRepository) {
    }

    async getAllAssets(filerDto: GetAssetFilterDto): Promise<AssetEntity[]> {
        const {status, search} = filerDto;
        const qb = this.assetRepository.createQueryBuilder("asset");
        if(status) {
            qb.andWhere("asset.status = :status",
                {status}
            );
        }
        if(search) {
            qb.andWhere("asset.title LIKE :search OR asset.description LIKE :search",
                {search: `%${search}%`}
            );
        }
        return  await qb.getMany();
    }

    async getAssetById(id:string): Promise<Asset> {
        const found = await this.assetRepository.findOne(id);
        if(!found) {
            throw new NotFoundException();
            throw new NotAcceptableException();
        }
        return found;
    }

    addAsset(assetDto: CreateAssetDto) {
        return this.assetRepository.saveAsset(assetDto);
    }

    async delete(id:string) {
        const assetEntity = await this.assetRepository.findOne(id);
        if(!assetEntity) {
            throw new NotFoundException();
        }
        return this.assetRepository.delete(assetEntity);
    }

    async updateStatus(id:string, status:string): Promise<UpdateResult> {
       const updatingAsset = await this.getAssetById(id);
       updatingAsset.status = AssetStatus[status];
       return this.assetRepository.update(id, updatingAsset);
    }
    //
    // deleteById(id:string) {
    //     return this.assets.delete(id);
    // }
    //
    // addAsset(assetDto: CreateAssetDto) {
    //     const asset: Asset = {
    //         id: uuid(),
    //         title: assetDto.title,
    //         description: assetDto.description,
    //         status: AssetStatus.OPEN
    //     }
    //     this.assets.set(asset.id, asset)
    //     return asset;
    // }
}
