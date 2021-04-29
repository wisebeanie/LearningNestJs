import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    check: boolean;
    accessToken: string;
    private http: HttpService;

    constructor() {
        this.check = false;
        this.http = new HttpService();
        this.accessToken = '';
    }
    loginCheck(): void {
        this.check = !this.check;
        return;
    }
    async login(url: string, headers: any) {
        return await this.http.post(url, '', { headers }).toPromise();
    }

    async getProfile(url: string, headers: any) {
        return await this.http.get(url, { headers }).toPromise();
    }
}
