import { Provider } from '@frontend/types';
import { ReactElement } from 'react';

export type FormGenerateProps = {
	provider: Provider;
	src: string;
};

const { NEXTAUTH_URL_AUTH } = process.env;

const FormGenerate = ({ provider, src }: FormGenerateProps): ReactElement => {
	const setProvider = () => localStorage.setItem('provider', provider);

	return (
		<form action={`${NEXTAUTH_URL_AUTH}/${provider}`} onClick={setProvider}>
			<button style={{ backgroundImage: `url(${src})` }} />
		</form>
	);
};

export default FormGenerate;
