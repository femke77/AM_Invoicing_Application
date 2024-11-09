import {Injectable, UnauthorizedException} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/auth-login.dto";
import { JwtService } from "@nestjs/jwt";
import errors from "src/config/errors.config";
// import * as bcrypt from "bcryptjs";


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.user({ email });
    // if (user && (await bcrypt.compare(password, user.password))) {     // if using bcrypt
    if (user && (password === user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException(errors.loginFailed);
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    const payload = { name: user.name, email: user.email, sub: user.id }; 

    return {
      token: this.jwtService.sign(payload),
      name: user.name,
      email: user.email,
      id: user.id,
    };
  }

  //TODO  Additional methods for registration, password management, etc. can be added here. Passport can be brought in for more advanced authentication strategies.
}
