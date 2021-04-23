import { Controller, Get, Header, HttpService, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Get()
    @Header('Content-type', 'text/html')
    kakaoLogin(@Res() res): void {
        const hostName = 'https://kauth.kakao.com';
        const restApiKey = `6d0e8a1afdde17641f1d0f4db2df0ff6`;
        // 카카오 서버 접속 후 redirect할 URL
        const redirectUrl = 'http://127.0.0.1:3000/auth/redirect';
        const url = `${hostName}/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;

        return res.redirect(url);
    }

    @Get('/redirect')
    @Header('Content-type', 'text/html')
    async kakaoLoginRedirect(@Query() qs, @Res() res) {
        const restApiKey = `6d0e8a1afdde17641f1d0f4db2df0ff6`;
        const redirect_url = 'http://127.0.0.1:3000/auth/redirect';
        const hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${restApiKey}&redirect_uri=${redirect_url}&code=${qs.code}`;
        const header = {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        }
        
        await this.authService.login(hostName, header).then((e) => {
            console.log(e.data.access_token);
            return res.send('good!');
        });
    }

}
