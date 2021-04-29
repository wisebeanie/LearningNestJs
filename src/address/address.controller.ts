import { Controller, Get, Query, Res } from '@nestjs/common';
import { ResponseMessage } from 'src/config/response.util';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {}

    @Get()
    async getAddress(@Res() res, @Query() qs) {
        const restApiKey = `6d0e8a1afdde17641f1d0f4db2df0ff6`;
        const addressQuery = qs.address;
        const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${addressQuery}`;
        const header = {
            'Authorization': `KakaoAK ${restApiKey}`,
            'Content-Type': 'application/json;charset=UTF-8'
        }
        const result = await this.addressService.getAddress(encodeURI(url), header);

        return res.send(new ResponseMessage().success("성공").body({x: result.data.documents[0].x, y: result.data.documents[0].y}).build());
    }
}
