import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseMessage } from 'src/config/response.util';
import { User } from 'src/entities/user.entity';
import { getManager, Repository } from 'typeorm';

@Injectable()
export class AddressService {
    private http: HttpService;

    constructor() {
        this.http = new HttpService();
    }

    async getAddress(url: string, headers: any) {
        return await this.http.get(url, { headers }).toPromise();
    }

    async addPoint(userIdx: number, latitude: number, longitude: number) {
        const addPointQuery = `
                    UPDATE user
                    SET latitude = ${latitude}, longitude = ${longitude}
                    WHERE id = ${userIdx};
                    `;
        const result = await getManager().query(addPointQuery);

        return new ResponseMessage().success('성공').body({'latitude': latitude, 'longitude': longitude}).build();
    }
}
