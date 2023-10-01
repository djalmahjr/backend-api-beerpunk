import app from './app';
import { connectionDB } from './config/databaseConfig';

async function start() {
	await connectionDB();
	const port = process.env.PORT || 3001;
	app.listen(port, () => console.log(`Server opened on port: ${port}`));
}

start().then();
