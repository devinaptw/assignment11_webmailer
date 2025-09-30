const menuRef = db.ref("menus");

if (document.getElementById("menuList")) {
	menuRef.on("value", (snapshot) => {
		const menuList = document.getElementById("menuList");
		menuList.innerHTML = "";
		snapshot.forEach((childSnapshot) => {
			const data = childSnapshot.val();
			const id = childSnapshot.key;
			menuList.innerHTML += `
        <tr>
          <td>${data.nama}</td>
          <td>${data.kategori}</td>
          <td>Rp ${data.harga}</td>
          <td>${data.porsi}</td>
          <td>${data.stok}</td>
          <td>
            <a href="update.html?id=${id}" class="btn btn-warning btn-sm">Update</a>
            <button class="btn btn-danger btn-sm" onclick="deleteMenu('${id}')">Hapus</button>
          </td>
        </tr>
      `;
		});
	});
}

if (document.getElementById("createForm")) {
	document.getElementById("createForm").addEventListener("submit", (e) => {
		e.preventDefault();
		const nama = document.getElementById("nama").value;
		const kategori = document.getElementById("kategori").value;
		const harga = document.getElementById("harga").value;
		const porsi = document.getElementById("porsi").value;
		const stok = document.getElementById("stok").value;

		menuRef.push({
			nama,
			kategori,
			harga,
      porsi,
      stok,
		});

		alert("Menu berhasil ditambahkan!");
		window.location.href = "index.html";
	});
}

if (document.getElementById("updateForm")) {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");

	if (id) {
		db.ref("menus/" + id)
			.get()
			.then((snapshot) => {
				if (snapshot.exists()) {
					const data = snapshot.val();
					document.getElementById("menuId").value = id;
					document.getElementById("nama").value = data.nama;
					document.getElementById("kategori").value = data.kategori;
					document.getElementById("harga").value = data.harga;
					document.getElementById("porsi").value = data.porsi;
					document.getElementById("stok").value = data.stok;
				}
			});
	}

	document.getElementById("updateForm").addEventListener("submit", (e) => {
		e.preventDefault();
		const nama = document.getElementById("nama").value;
		const kategori = document.getElementById("kategori").value;
		const harga = document.getElementById("harga").value;
		const porsi = document.getElementById("porsi").value;
		const stok = document.getElementById("stok").value;

		db.ref("menus/" + id).update({
			nama,
			kategori,
			harga,
			porsi,
			stok,
		});

		alert("Menu berhasil diperbarui!");
		window.location.href = "index.html";
	});
}

function deleteMenu(id) {
	if (confirm("Yakin ingin menghapus menu ini?")) {
		db.ref("menus/" + id).remove();
		alert("Menu berhasil dihapus!");
	}
}
