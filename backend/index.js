const { initializeDatabase } = require('./db/db.connect')
const Product = require('./models/product.models')
const express = require('express')

const app = express()
app.use(express.json())


initializeDatabase()

const cors = require('cors')
const corsOptions = {
    origin: '*',
    credential: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


const getAllProduct  = async () => {
    try {
        const data = await  Product.find()
        return data
    } catch (error) {
        throw error
    }
}

app.get("/products", async(req, res) => {
    try {
        const data = await getAllProduct()
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the product data"})
    }
})


const getProductById  = async (productId) => {
    try {
        const data = await  Product.findById(productId)
        return data
    } catch (error) {
        throw error
    }
}

app.get("/products/:productId", async(req, res) => {
    try {
        const data = await getProductById(req.params.productId)
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the product"})
    }
})

const getProductByCategories  = async (productCategory) => {
    try {
        const data = await  Product.find({category: productCategory })
        return data
    } catch (error) {
        throw error
    }
}

app.get("/products/categories/:categoriesName", async(req, res) => {
    try {
        const data = await getProductByCategories(req.params.categoriesName)
         if (data.length === 0) {
      return res.status(404).json({ error: "No products found in this category" });
    }
        res.json(data)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch the product"})
    }
})


const getProductCategoriesById  = async (productId) => {
    try {
        const data = await  Product.findById(productId)
        return data
    } catch (error) {
        throw error
    }
}

app.get("/products/categories/:categoriesName/:productId", async(req, res) => {
    try {
        const data = await getProductCategoriesById(req.params.productId)
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Failed to fetch the product"})
    }
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log("Server is running on post", PORT)
})