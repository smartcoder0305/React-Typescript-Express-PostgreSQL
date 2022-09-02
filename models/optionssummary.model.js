
module.exports = (sequelize, Sequelize) => {
    const Optionssummary = sequelize.define('optionssummary', {
        quotedate: {
            type: Sequelize.DATE,
            primaryKey: true
        },
        symbol: {
            type: Sequelize.STRING(10),
            primaryKey: true
        },
        companyname: {
            type: Sequelize.STRING(150)
        },
        stocklastprice: {
            type: Sequelize.DECIMAL(19, 4)
        },
        prevdaylastprice: {
            type: Sequelize.DECIMAL(19, 4)
        },
        stockchangeprice: {
            type: Sequelize.DECIMAL(19, 4)
        },
        stockpercchange: {
            type: Sequelize.DECIMAL(5, 2)
        },
        iv: {
            type: Sequelize.DECIMAL(5, 2)
        },
        ivhighoneyear: {
            type: Sequelize.DECIMAL(5, 2)
        },
        ivlowoneyear: {
            type: Sequelize.DECIMAL(5, 2)
        },
        optionstotvol: {
            type: Sequelize.STRING
        },
        optionsputvol: {
            type: Sequelize.STRING
        },
        optionscallvol: {
            type:Sequelize.INTEGER
        },
        optionstotoi: {
            type: Sequelize.INTEGER
        },
        optionsputoi: {
            type: Sequelize.INTEGER
        },
        optionscalloi: {
            type: Sequelize.INTEGER
        },
        avgoptionsvol50day: {
            type: Sequelize.INTEGER
        },
        percputvolume: {
            type: Sequelize.DECIMAL(5, 2)
        },
        perccallvolume: {
            type:Sequelize.DECIMAL(5, 2)
        },
        putcallratio: {
            type: Sequelize.DECIMAL(5, 2)
        },
        stockvolume: {
            type: Sequelize.INTEGER
        },
        avgstockvolume50day: {
            type: Sequelize.INTEGER
        },
        stockopen: {
            type: Sequelize.DECIMAL(18, 4)
        },
        stockhigh: {
            type: Sequelize.DECIMAL(18, 4)
        },
        stocklow: {
            type: Sequelize.DECIMAL(18, 4)
        },
        stocklow52week: {
            type: Sequelize.DECIMAL(18, 4)
        },
        assettype: {
            type: Sequelize.STRING(4)
        }
    }, {
        freezeTableName: true,
        timestamps: false
    })
    return Optionssummary
}