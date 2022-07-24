import {EntityRepository, Repository} from "typeorm";
import {AssetEntity} from "./asset.entity";
import {AssetStatus} from "./asset.model";
import {CreateAssetDto} from "./asset.dto";

@EntityRepository(AssetEntity)
export class AssetRepository extends Repository<AssetEntity>{

    saveAsset(assetDto: CreateAssetDto): Promise<AssetEntity> {
        const {title, description} = assetDto;
        const assetEntity = this.create({
            title,
            description,
            status: AssetStatus.OPEN
        });
        return this.save(assetEntity);
    }
}
