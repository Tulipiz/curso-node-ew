const Sequelize = require('sequelize');
const ICrud = require ('./interfaces/interfaceCrud')

class Postgres extends ICrud {
    constructor(){
        super()
        this._driver = null;
        this._herois = null;
        this.connect()
       
    }    
    
    async isConnected(){
        try {
            await this._driver.authenticate()
            return true;
        } catch (error) {
            console.log('fail!',error)
            return false;
        }
    }
    async defineModel() {
        
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true,
    
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        });
        await this._herois.sync();
    }

    async create(item){
        console.log('item', item)
        const {
            dataValues
        } = await this._herois.create(item)
        return dataValues;
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'luizdias',
            'minhasenhasecreta',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        );
        await this.defineModel();
    }
}

module.exports = Postgres;