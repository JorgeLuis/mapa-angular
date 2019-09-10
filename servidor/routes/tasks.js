const router = require('express-promise-router')();
let jsforce = require('jsforce');
//const mongojs = require('mongojs');
// const db = mongojs('mean-tasks', ['tasks']);

// GET All Predios
router.get('/predios', (req, res3, next) => {
    var q = "SELECT Name, Id_Org__c, Tipo_de_Red__c, BillingState FROM Account WHERE ((((Estado_LAB__c = 'Instalado' OR Estado_LAB__c = 'Completada') OR ((Estado_LAC__c = 'Instalado' OR Estado_LAC__c = 'Completada') AND ((BillingState = 'CABA' OR BillingState = 'San Luis') OR Meraki_En_Linea__c = true))) AND Proveedor_Nombre_LAB__c != 'ARSAT') OR ((Estado_LAB__c = 'Instalado' OR Estado_LAB__c = 'Completada') AND (Tipo_de_Red__c = 'USAP' OR Tipo_de_Red__c = 'LAB+') AND Proveedor_Nombre_LAB__c = 'ARSAT')    )";
    var conn = new jsforce.Connection();
    conn.login('asilva@eulas.com', 'M3r4k1@123p6ufTzbt2Pz1pbOyfpN7cW87f', function (err, res) {
        if (err) { return console.error(err); }

        /*
        conn.query(q, function (err, resP) {
            if (err) { return console.error(err); }
            console.log('Predios');
            console.log(resP);
            return res3.json(resP);
        });*/

        var records = [];
        var query = conn.query(q)
            .on("record", function (record) {
                records.push(record);
            })
            .on("end", function () {
                console.log("total in database : " + query.totalSize);
                console.log("total fetched : " + query.totalFetched);
                return res3.json(records);
            })
            .on("error", function (err) {
                console.error(err);
            })
            .run({ autoFetch: true, maxFetch: 12000 }); // synonym of Query#execute();
    });
});


module.exports = router;