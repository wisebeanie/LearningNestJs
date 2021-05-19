import { Controller, Get, Param, Patch, Query, Res } from '@nestjs/common';
import { ResponseMessage } from 'src/config/response.util';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Patch('/:userIdx')
    async getAddress(@Res() res, @Query() qs, @Param('userIdx') userIdx: number) {
        const restApiKey = `6d0e8a1afdde17641f1d0f4db2df0ff6`;
        const addressQuery = qs.address;
        const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${addressQuery}`;
        const header = {
            'Authorization': `KakaoAK ${restApiKey}`,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        const result = await this.addressService.getAddress(encodeURI(url), header);

        const latitude = result.data.documents[0].x;
        const longitude = result.data.documents[0].y;
        
        const addPointResult = await this.addressService.addPoint(userIdx, latitude, longitude);

        return res.send(addPointResult);
    }
}