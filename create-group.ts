async function main() {
	try {
		// Build the payload for the group
		const data = JSON.stringify({
			name: "My cool group", // Name for the group
			is_public: false, // Deisgnate if you want the group to be public
		});

		const createGroupRequest = await fetch(
			"https://api.pinata.cloud/v3/files/groups",
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
		const group = await createGroupRequest.json();
		console.log(group);
	} catch (error) {
		console.log(error);
	}
}

main();
