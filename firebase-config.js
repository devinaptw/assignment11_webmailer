const firebaseConfig = {
	apiKey: "AIzaSyBJ65moI9iYrcIxpxc29CmMggXRdnXinF4",
	authDomain: "baas-project-ae216.firebaseapp.com",
	databaseURL:
		"https://baas-project-ae216-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "baas-project-ae216",
	storageBucket: "baas-project-ae216.firebasestorage.app",
	messagingSenderId: "314265842752",
	appId: "1:314265842752:web:7a64fee1e6a9b7853a9ba5",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();