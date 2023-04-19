const sqliteConnection =require ('../sqlite')
const {createUsers,} =require('../migrations/createUsers')

async function migrationsRun(){
    const schemes = [createUsers].join('')

    sqliteConnection().then(db=> db.exec(schemes)).catch(erro=>console.error(erro))


}

module.exports=migrationsRun