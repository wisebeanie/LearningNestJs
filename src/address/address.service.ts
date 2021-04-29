import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AddressService {
    private http: HttpService;

    constructor () {
        this.http = new HttpService();
    }

    async getAddress(url: string, headers: any) {
        return await this.http.get(url, { headers }).toPromise();
    }
}
