import { NextApiRequest, NextApiResponse } from 'next';

function users(request: NextApiRequest, response: NextApiResponse) {
	const usersList = [
		{
			id: 1,
			name: 'Dailton',
		},
		{
			id: 2,
			name: 'Bastos',
		},
		{
			id: 3,
			name: 'Cardoso',
		},
	];

	return response.json(usersList);
}

export default users;
