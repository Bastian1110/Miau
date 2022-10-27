db.createUser({
    user: "AzureDiamond",
    pwd: "hunter2",
    roles: [
        {
            role: "readWrite",
            db: "alerta_atizapan"
        }
    ]
});
//DESTROY THIS FILE IN PRODUCTION