async function main() {
	try {
		// Fetch a group
		const listGroupRequest = await fetch(
			"https://api.pinata.cloud/v3/files/groups",
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${process.env.PINATA_JWT}`,
				},
			},
		);
		const listGroups = await listGroupRequest.json();

		// Get group ID
		const groupId = listGroups.data.groups[0].id;

		// Fetch a file ID
		const fileRequest = await fetch("https://api.pinata.cloud/v3/files", {
			method: "GET",
			headers: {
				Authorization: `Bearer ${process.env.PINATA_JWT}`,
			},
		});
		const files = await fileRequest.json();

		// Get file ID
		const fileId = files.data.files[0].id;

		// Add file to group
		const request = await fetch(
			`https://api.pinata.cloud/v3/files/groups/${groupId}/ids/${fileId}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${process.env.PINATA_JWT}`,
				},
			},
		);
		const response = await request.json();
		console.log(response);

		// Fetch the same file to show its part of the group now
		const fileInfoRequest = await fetch(
			`https://api.pinata.cloud/v3/files/${fileId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${process.env.PINATA_JWT}`,
				},
			},
		);
		const fileInfo = await fileInfoRequest.json();
		console.log(fileInfo);
	} catch (error) {
		console.log(error);
	}
}

main();
