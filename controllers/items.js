const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Item = require("../models/Item");
const User = require("../models/user");
const AWS = require("aws-sdk");
const fs = require("fs");

//@desc    Get all items
//@route   GET /api/v1/items
//@access  Public
exports.getItems = asyncHandler(async (req, res, next) => {
  const result = await Item.find();
  res.status(200).json({ success: true, data: result });
});

//@desc    Get item by id
//@route   GET /api/v1/items/:id
//@access  Public
exports.getItemById = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);
  if (!item) {
    res.status(404).json({
      success: false,
      data: `Resource not found with id of ${req.params.id}`,
    });
  }
  const user = await User.findById(item.userId);
  res.status(200).json({ success: true, data: item, user });
});

//@desc    Get items by username
//@route   GET /api/v1/items/user/:id
//@access  Public
exports.getItemByUserId = asyncHandler(async (req, res, next) => {
  const item = await Item.find({ userId: req.params.id });
  console.log(item);
  if (!item || item.length === 0) {
    res.status(404).json({
      success: false,
      data: `Resource not found with id of ${req.params.username}`,
    });
  }
  res.status(200).json({ success: true, data: item });
});

//@desc    Update item by id
//@route   PUT /api/v1/items/:id
//@access  Private
exports.updateItemById = asyncHandler(async (req, res, next) => {
  let item = await Item.findById(req.params.id);

  if (!Item) {
    res.status(404).json({
      success: false,
      data: `Resource not found with id of ${req.params.id}`,
    });
  }

  if (item.userId.toString() !== req.user._id.toString()) {
    res.status(401).json({ success: false, data: "Not authorized" });
  }

  req.body.photos = req.body.photos.concat(item.photos);

  item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: item });
});

//@desc    Delete items by id
//@route   DELETE /api/v1/items/:id
//@access  Private
exports.deleteItemById = asyncHandler(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  if (!Item) {
    res.status(404).json({
      success: false,
      data: `Resource not found with id of ${req.params.id}`,
    });
  }

  if (item.userId.toString() !== req.user._id.toString()) {
    res.status(401).json({ success: false, data: "Not authorized" });
  }
  item.remove();

  res.status(200).json({ success: true, data: "Item removed" });
});

//@desc    Create items
//@route   Post /api/v1/items
//@access  Private
exports.createItem = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.username;
  req.body.userId = req.user._id;
  // console.log(req.user)
  console.log(req.body);
  if (req.body.photos === undefined || req.body.photos.length === 0) {
    res
      .status(400)
      .json({ success: false, data: "please include at least 1 image" });
  }
  const result = await Item.create(req.body);
  res.status(200).json({ success: true, data: result });
});

//@desc    Create items
//@route   Post /api/v1/items/image
//@access  Private
exports.uploadImageForCreateItem = asyncHandler(async (req, res, next) => {
  const S3_ID = process.env.S3_ID;
  const S3_SECRET = process.env.S3_SECRET;
  const BUCKET_NAME = process.env.BUCKET_NAME;

  const s3 = new AWS.S3({
    accessKeyId: S3_ID,
    secretAccessKey: S3_SECRET,
  });

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const imageList = [];
  if (req.files.images.length !== undefined) {
    await Promise.all(
      req.files.images.map((image) => {
        if (!image.mimetype.startsWith("image")) {
          res
            .status(400)
            .json({ success: false, data: "Please upload an image file" });
        }
        const params = {
          Bucket: BUCKET_NAME,
          Key: image.name,
          Body: image.data,
        };

        s3.upload(params, (err, data) => {
          if (err) {
            throw err;
          }
          imageList.push(data.Location);
          if (imageList.length === req.files.images.length) {
            res.status(200).json({ success: true, data: imageList });
          }
        });
      })
    );
  } else {
    const file = req.files.images;
    if (!file.mimetype.startsWith("image")) {
      res
        .status(400)
        .json({ success: false, data: "Please upload an image file" });
    }

    const params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data,
    };

    await s3.upload(params, (err, data) => {
      if (err) {
        throw err;
      }
      imageList.push(data.Location);

      res.status(200).json({ success: true, data: imageList });
    });
  }

  // const result = await Item.create(req.body);
  // console.log(result)
});
