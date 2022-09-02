const express = require('express')
const router = express.Router()

const db = require("../models");
const Optionssummary = db.optionssummary;
const Op = db.Sequelize.Op;
// Create and Save a new Options Summary
// exports.create = (req, res) => {
  
// };
// // Retrieve all Options Summaries from the database.
// exports.findAll = (req, res) => {
  
// };
// // Find a single Options Summary with an id
// exports.findOne = (req, res) => {
  
// };
// // Update a Options Summary by the id in the request
// exports.update = (req, res) => {
  
// };
// // Delete a Options Summary with the specified id in the request
// exports.delete = (req, res) => {
  
// };
// // Delete all Options Summaries from the database.
// exports.deleteAll = (req, res) => {
  
// };
// // Find all published Options Summaries
// exports.findAllPublished = (req, res) => {
  
// };

let orderBy = ['symbol', 'ASC'];
const columns = ['quotedate', 'symbol', 'companyname', 'stocklastprice', 'stockchangeprice', 'stockpercchange', 'iv', 'optionstotvol', 'percputvolume', 'perccallvolume', 'putcallratio']

// [Op.or]: columns.map((col) => ({
//     [col]: {
//         [Op.iLike]: `%${searchtext}%`
//     }
// }))

router.get('/', async (req, res) => {
    let { offset, limit, searchquery, sortBy } = req.query
    let {symbol, companyname, stocklastpricefrom, stocklastpriceto, stockchangepricefrom,  stockchangepriceto, stockpercchangefrom,  stockpercchangeto, ivfrom,  ivto, optionstotvolfrom,  optionstotvolto, percputvolumefrom,  percputvolumeto, perccallvolumefrom,  perccallvolumeto, putcallratiofrom,  putcallratioto} = JSON.parse(searchquery)

    stocklastpricefrom = parseFloat(stocklastpricefrom)
    stocklastpriceto = parseFloat(stocklastpriceto)
    stockchangepricefrom = parseFloat(stockchangepricefrom)
    stockchangepriceto = parseFloat(stockchangepriceto)
    stockpercchangefrom = parseFloat(stockpercchangefrom/100)
    stockpercchangeto = parseFloat(stockpercchangeto/100)
    ivfrom = parseFloat(ivfrom/100)
    ivto = parseFloat(ivto/100)
    optionstotvolfrom = parseFloat(optionstotvolfrom)
    optionstotvolto = parseFloat(optionstotvolto)
    percputvolumefrom = parseFloat(percputvolumefrom/100)
    percputvolumeto = parseFloat(percputvolumeto/100)
    perccallvolumefrom = parseFloat(perccallvolumefrom/100)
    perccallvolumeto = parseFloat(perccallvolumeto/100)
    putcallratiofrom = parseFloat(putcallratiofrom/100)
    putcallratioto = parseFloat(putcallratioto/100)

    const whereArr = [
        symbol && {
            symbol: {
                [Op.iLike]: `%${symbol}%`
            }
        },
        companyname && {
            companyname: {
                [Op.iLike]: `%${companyname}%`
            }
        },
        stocklastpricefrom && stocklastpriceto && {
            stocklastprice: {
                [Op.between]: [stocklastpricefrom, stocklastpriceto]
            }
        },
        stocklastpricefrom && !stocklastpriceto && {
            stocklastprice: {
                [Op.gte]: stocklastpricefrom
            }
        },
        !stocklastpricefrom && stocklastpriceto && {
            stocklastprice: {
                [Op.lte]: stocklastpriceto
            }
        },
        stockchangepricefrom && stockchangepriceto && {
            stockchangeprice: {
                [Op.between]: [stockchangepricefrom, stockchangepriceto]
            }
        },
        stockchangepricefrom && !stockchangepriceto && {
            stockchangeprice: {
                [Op.gte]: stockchangepricefrom
            }
        },
        !stockchangepricefrom && stockchangepriceto && {
            stockchangeprice: {
                [Op.lte]: stockchangepriceto
            }
        },
        stockpercchangefrom && stockpercchangeto && {
            stockpercchange: {
                [Op.between]: [stockpercchangefrom, stockpercchangeto]
            }
        },
        stockpercchangefrom && !stockpercchangeto && {
            stockpercchange: {
                [Op.gte]: stockpercchangefrom
            }
        },
        !stockpercchangefrom && stockpercchangeto && {
            stockpercchange: {
                [Op.lte]: stockpercchangeto
            }
        },
        ivfrom && ivto && {
            iv: {
                [Op.between]: [ivfrom, ivto]
            }
        },
        ivfrom && !ivto && {
            iv: {
                [Op.gte]: ivfrom
            }
        },
        !ivfrom && ivto && {
            iv: {
                [Op.lte]: ivto
            }
        },
        optionstotvolfrom && optionstotvolto && {
            optionstotvol: {
                [Op.between]: [optionstotvolfrom, optionstotvolto]
            }
        },
        optionstotvolfrom && !optionstotvolto && {
            optionstotvol: {
                [Op.gte]: optionstotvolfrom
            }
        },
        !optionstotvolfrom && optionstotvolto && {
            optionstotvol: {
                [Op.lte]: optionstotvolto
            }
        },
        percputvolumefrom && percputvolumeto && {
            percputvolume: {
                [Op.between]: [percputvolumefrom, percputvolumeto]
            }
        },
        percputvolumefrom && !percputvolumeto && {
            percputvolume: {
                [Op.gte]: percputvolumefrom
            }
        },
        !percputvolumefrom && percputvolumeto && {
            percputvolume: {
                [Op.lte]: percputvolumeto
            }
        },
        perccallvolumefrom && perccallvolumeto && {
            perccallvolume: {
                [Op.between]: [perccallvolumefrom, perccallvolumeto]
            }
        },
        perccallvolumefrom && !perccallvolumeto && {
            perccallvolume: {
                [Op.gte]: perccallvolumefrom
            }
        },
        !perccallvolumefrom && perccallvolumeto && {
            perccallvolume: {
                [Op.lte]: perccallvolumeto
            }
        },
        putcallratiofrom && putcallratioto && {
            putcallratio: {
                [Op.between]: [putcallratiofrom, putcallratioto]
            }
        },
        putcallratiofrom && !putcallratioto && {
            putcallratio: {
                [Op.gte]: putcallratiofrom
            }
        },
        !putcallratiofrom && putcallratioto && {
            putcallratio: {
                [Op.lte]: putcallratioto
            }
        }
    ].filter((val) => val !== '')
    console.log(whereArr)
    const count = await (whereArr !== [] ? Optionssummary.count({
        where: {
            [Op.and]: whereArr
        }
    }) : Optionssummary.count())

    if(offset >= count) offset = count - (count % limit ?? limit)

    if(sortBy) {
        if(orderBy[0] === sortBy) {
            orderBy[1] = ['ASC', 'DESC'][orderBy[1] === 'ASC' ? 1 : 0]
        } else {
            orderBy = [sortBy, 'ASC']
        }
    }

    Optionssummary.findAndCountAll({
        attributes: columns,
        offset: offset,
        limit: limit,
        order: [orderBy],
        where: whereArr!==[] ? {
            [Op.and]: whereArr
        } : {}
    })
    .then(data => {
        res.status(200).json({data: data.rows.map((item) => item.dataValues), count, offset})
    })
    .catch(error => {
        throw error
    })
})

module.exports = router