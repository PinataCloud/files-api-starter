async function main() {
	try {
		// Fetch the lastest file and make a signed URL for it
		const fileRequest = await fetch(
			"https://api.pinata.cloud/v3/files?limit=1",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${process.env.PINATA_JWT}`,
				},
			},
		);
		const fileData = await fileRequest.json();

		// Get the CID
		const cid = fileData.data.files[0].cid;

		// Construct the payload
		const data = JSON.stringify({
			url: `https://${process.env.GATEWAY_URL}/files/${cid}`, // Construct the url with the gateway and cid of the file
			date: Math.floor(new Date().getTime() / 1000), // Current date
			expires: 180, // Number of seconds the link is valid for
			method: "GET", // Method for accessing a file
		});

		const signedURLRequest = await fetch(
			"https://api.pinata.cloud/v3/files/sign",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.PINATA_JWT}`,
				},
				body: data,
			},
		);
		// Parse the response and log it out
		const url = await signedURLRequest.json();
		console.log(url);
	} catch (error) {
		console.log(error);
	}
}

main();
