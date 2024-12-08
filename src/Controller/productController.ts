import { Request, Response } from "express";
import url from "url";
import Product from "../Models/products";
import Sale from "../Models/sales";

interface ProductType {
  ProductID: number;
  ProductName: string;
  Price: number;
}
interface trendingProduct {
  ProductID: string;
  ProductName: string;
  Price: number;
  TotalQuantity: number;
  totalIncome: number;
}

interface Category {
  Category: string;
  totalSalesCount: number;
  categoryPercentage: string;
}

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string)  || 1
 const skip = ( page - 1)*10

    
    const results = await Sale.aggregate([
      {
        $group: {
          _id: "$ProductID",
          TotalQuantity: { $sum: "$Quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "ProductID",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
      $skip : skip
      },
      {
        $limit : 10
      },
      {
        $project: {
          _id: 0,
          ProductID: "$_id",
          ProductName: "$productInfo.ProductName",
          Price: "$productInfo.Price",
          TotalQuantity: 1,
        },
      },
    ]);

    res.json({
      results,
      status: 200,
      message: "fetching  products succesfully",
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.message, message: "error getting  project " });
  }
};

export const TotalSales = async (req: Request, res: Response) => {
  const mind = new Date(req.query.mind as string);
  const maxd = new Date(req.query.maxd as string);

  

  Sale.aggregate([
    {
      $match: {
        Date: { $gte: mind, $lte: maxd },
      },
    },
    {
      $group: {
        _id: null,
        TotalAmount: { $sum: "$TotalAmount" },
      },
    },
  ])
    .then((results) => {
      res.json({
        results,
        status: 200,
        message: "fetching total sales",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
        status: 500,
        message: "internal server error",
      });
    });
};

export const TrendingProducts = async (req: Request, res: Response) => {
  try {
    const topSellingProducts = await Sale.aggregate([
      {
        $group: {
          _id: "$ProductID",
          TotalQuantity: { $sum: "$Quantity" },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "ProductID",
          as: "productInfo",
        },
      },
      {
        $unwind: "$productInfo",
      },
      {
        $sort: { TotalQuantity: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          ProductID: "$_id",
          ProductName: "$productInfo.ProductName",
          Price: "$productInfo.Price",
          TotalQuantity: 1,
        },
      },
    ]);

    const results: trendingProduct[] = topSellingProducts.map((product) => ({
      ...product,
      totalIncome: product.Price * product.TotalQuantity,
    }));

    res.json({
      results,
      status: 200,
      message: "fetching top products succesfully",
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ error: err.message, message: "error getting trending project " });
  }
};

export const Category_Sales = async (req: Request, res: Response) => {
  try {
    const categoriesWithSales = await Product.aggregate([
      {
        $lookup: {
          from: "sales",
          localField: "ProductID",
          foreignField: "ProductID",
          as: "salesInfo",
        },
      },
      {
        $addFields: {
          salesCount: { $sum: "$salesInfo.Quantity" },
        },
      },
      {
        $group: {
          _id: "$Category",
          totalSalesCount: { $sum: "$salesCount" },
        },
      },
      {
        $project: {
          _id: 0,
          Category: "$_id",
          totalSalesCount: 1,
        },
      },
    ]);
    const totalSales = categoriesWithSales.reduce(
      (prevS, currS) => prevS + currS.totalSalesCount,
      0,
    );

    const results: Category[] = categoriesWithSales.map((item) => {
      return {
        ...item,
        categoryPercentage: ((item.totalSalesCount * 100) / totalSales).toFixed(
          2,
        ),
      };
    });

    res.status(200).json({
      results,
      status: 200,
      message: "category sales data ",
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
      status: 500,
      message: "internal server error",
    });
  }
};
