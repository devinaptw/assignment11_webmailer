const customerRef = db.ref("customers");

if (document.getElementById("customerList")) {
	customerRef.on("value", (snapshot) => {
		const customerList = document.getElementById("customerList");
		customerList.innerHTML = "";
		snapshot.forEach((childSnapshot) => {
			const data = childSnapshot.val();
			const id = childSnapshot.key;
			customerList.innerHTML += `
        <tr>
          <td>${data.nama}</td>
          <td>${data.email}</td>
          <td>${data.nohp}</td>
          <td>
            <a href="update_customer.html?id=${id}" class="btn btn-warning btn-sm">Update</a>
            <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${id}')">Hapus</button>
          </td>
        </tr>
      `;
		});
	});
}

if (document.getElementById("createCustomerForm")) {
	document
		.getElementById("createCustomerForm")
		.addEventListener("submit", (e) => {
			e.preventDefault();
			const nama = document.getElementById("nama").value;
			const email = document.getElementById("email").value;
			const nohp = document.getElementById("nohp").value;

			customerRef.push({
				nama,
				email,
				nohp,
			});

			alert("Customer berhasil ditambahkan!");
			window.location.href = "customer.html";
		});
}

if (document.getElementById("updateCustomerForm")) {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");

	if (id) {
		db.ref("customers/" + id)
			.get()
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					document.getElementById("customerId").value = id;
					document.getElementById("nama").value = data.nama;
					document.getElementById("email").value = data.email;
					document.getElementById("nohp").value = data.nohp;
				}
			});
	}

	document
		.getElementById("updateCustomerForm")
		.addEventListener("submit", (e) => {
			e.preventDefault();
			const nama = document.getElementById("nama").value;
			const email = document.getElementById("email").value;
			const nohp = document.getElementById("nohp").value;

			db.ref("customers/" + id).update({
				nama,
				email,
				nohp,
			});

			alert("Customer berhasil diperbarui!");
			window.location.href = "customer.html";
		});
}

function deleteCustomer(id) {
	if (confirm("Yakin ingin menghapus customer ini?")) {
		db.ref("customers/" + id).remove();
		alert("Customer berhasil dihapus!");
	}
}
