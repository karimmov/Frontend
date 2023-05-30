export default class AuthorizedFetch {

	static async checkIsAuthenticate() {
		const token = sessionStorage.getItem('token');
		if (token === null || token === undefined || token === "") return false
		const url = 'http://176.124.192.224/api/checkIsAuthenticated';
		const response = await fetch(url, {
			headers: {
				"Authorization": "Bearer " + token
			}
		});
		if (response.ok === true)
			return true;
		return false;
	}
}