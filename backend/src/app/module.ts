import AuthModule from 'src/auth/module';
import GraphQLModule from 'src/graphql/module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: ['.env.production.local', '.env.local'],
		}),
		GraphQLModule,
		MongooseModule.forRoot(process.env.DB_HOST, {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}),
		AuthModule,
	],
})
export default class AppModule {}
