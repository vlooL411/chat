import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Provider } from 'src/graphql';

@Injectable()
class googleGuard extends AuthGuard(Provider.google) {}

const GoogleGuard = (): MethodDecorator & ClassDecorator =>
	UseGuards(googleGuard);

export default GoogleGuard;
