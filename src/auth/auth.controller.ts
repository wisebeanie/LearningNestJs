import { Controller, Get, Header, HttpService, Query, Res } from '@nestjs/common';
import { Http } from '@sentry/node/dist/integrations';
import { ResponseMessage } from 'src/config/response.util';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Get('/kakao')
    @Header('Content-type', 'text/html')
    kakaoLogin(@Res() res): void {
        const hostName = 'https://kauth.kakao.com';
        const restApiKey = `6d0e8a1afdde17641f1d0f4db2df0ff6`;
        // 카카오 서버 접속 후 redirect할 URL
        const redirectUrl = 'http://127.0.0.1:3000/auth/kakao/redirect';
        const url = `${hostName}/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code&scope=account_email`;

        return res.redirect(url);
    }

    @Get('/kakao/redirect')
    @Header('Content-type', 'text/html')
    async kakaoLoginRedirect(@Query() qs, @Res() res) {
        const restApiKey = `6d0e8a1afdde17641f1d0f4db2df0ff6`;
        const redirect_url = 'http://127.0.0.1:3000/auth/kakao/redirect';
        const hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${restApiKey}&redirect_uri=${redirect_url}&code=${qs.code}`;
        const header = {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            
        }
        
        await this.authService.login(hostName, header).then((e) => {
            const headers = {
                'Authorization': `Bearer ${e.data.access_token}`
            }
            this.authService.getProfile("https://kapi.kakao.com/v2/user/me", headers).then((e) => {
                return res.send(new ResponseMessage().success("성공").body({email: e.data.kakao_account.email}).build());
            })
        });
    }

    @Get('/google')
    GoogleLogin(@Res() res) {
        const clinetId = `478102251953-jtk566p772cl659iem0re30lnufmtpri.apps.googleusercontent.com`;
        const scope = `https://www.googleapis.com/auth/userinfo.email`;
        const redirectUri = `http://localhost:3000/auth/google/redirect`;
        const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${redirectUri}&client_id=${clinetId}`;

        return res.redirect(url);
    }

    @Get('/google/redirect')
    async GoogleLoginRedirect(@Query() qs, @Res() res) {
        const code = qs.code;
        const redirectUri = `http://localhost:3000/auth/google/redirect`;
        const clientId = `478102251953-jtk566p772cl659iem0re30lnufmtpri.apps.googleusercontent.com`;
        const clientSecret = `FpHl4RYY5NuArKdEQ7VDV5kb`;
        const header = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        const host = `https://www.googleapis.com/oauth2/v4/token?code=${code}&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&grant_type=authorization_code`;

        await this.authService.login(host, header).then((e) => {
            const header = {
                'Authorization': `Bearer ${e.data.access_token}`
            }
            this.authService.getProfile(`https://www.googleapis.com/oauth2/v2/userinfo`, header).then((e) => {
                return res.send(new ResponseMessage().success("성공").body({email: e.data.email}).build());
            })
        })
    }
}
