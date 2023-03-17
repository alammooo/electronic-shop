const { Op } = require("sequelize")
const { Item, User } = require("../models")
const { compPassword } = require("../helpers/encryption")
const { generateToken } = require("../helpers/jwt")
const fs = require("fs")

class Controller {
  static async register(req, res, next) {
    try {
      const { username, password } = req.body
      const user = await User.create({ username, password })
      res
        .status(201)
        .json({ message: `Success create user : ${user.username}` })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username,
        },
      })
      if (!user) throw { name: "invalidUser" }
      if (!compPassword(password, user.password)) {
        throw { name: "invalidUser" }
      }
      const access_token = generateToken({
        id: user.id,
      })
      res.status(200).json({ access_token })
    } catch (error) {
      next(error)
    }
  }

  static async getItems(req, res, next) {
    try {
      const { name } = req.query
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 9

      const offset = (page - 1) * limit
      const option = {
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        limit,
        offset,
        order: [["createdAt", "ASC"]],
      }

      const { count, rows } = await Item.findAndCountAll(
        name
          ? option
          : {
              limit,
              offset,
              order: [["createdAt", "ASC"]],
            }
      )

      const totalPages = Math.ceil(count / limit)
      if (rows.length === 0) throw { name: "notFound" }
      if (!rows) throw { name: "notFound" }
      res.status(200).json({ rows, totalPages })
    } catch (error) {
      next(error)
    }
  }

  static async postItem(req, res, next) {
    try {
      const { name, buyPrice, sellPrice, stock } = req.body
      let img
      if (!req.file) {
        img = undefined
      } else {
        img = req.file.filename
      }
      const item = await Item.create({
        img,
        name,
        buyPrice,
        sellPrice,
        stock,
      })

      return res.status(200).json({ message: "Successfully upload item", item })
    } catch (error) {
      next(error)
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const item = await Item.findByPk(req.params.id)
      if (item) {
        await item.destroy()
        if (item.img !== null) {
          fs.unlink("./uploads/" + item.img,(err)=>{
            console.log(err)
          })
        }
        res.status(200).json({ message: "Item deleted" })
      } else {
        throw { name: "notFound" }
      }
    } catch (error) {
      next(error)
    }
  }

  static async getItemById(req, res, next) {
    try {
      const item = await Item.findByPk(req.params.id)
      if (item) {
        res.json({ item })
      } else {
        throw { name: "notFound" }
      }
    } catch (error) {
      next(error)
    }
  }

  static async updateItem(req, res, next) {
    try {
      const { id } = req.params
      const { name, buyPrice, sellPrice, stock } = req.body
      const item = await Item.findByPk(id)
      if (item) {
        item.name = name
        item.buyPrice = buyPrice
        item.sellPrice = sellPrice
        item.stock = stock
        if (req.file) {
          item.image = req.file?.filename
        }
        await item.save()
        res.json({ item })
      } else {
        throw { name: "notFound" }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
