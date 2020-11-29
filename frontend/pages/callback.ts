import { NextApiRequest, NextApiResponse } from 'next';

export default async (
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> => {
	console.log(req.url);
	console.log(res);

	const ans = await fetch(
		process.env.NEXTAUTH_URL_AUTH +
			'/google/callback?code=4%2F0AY0e-g7l5Ton9yf8mj11NuftCo4Q4eIQPtwKPSfktY_Pvjh7s6FtpnwOfTkQv0VqaW-bnA&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid&authuser=1&prompt=consent#',
	);

	res.send(ans);
	return;
};
