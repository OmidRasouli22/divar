import multer from "multer";
import fs from "fs";
import path from "path";
import createHttpError from "http-errors";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync(path.join(process.cwd(), "public", "upload"), {
      recursive: true,
    });
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    const whiteListFormat = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    if (whiteListFormat.includes(file.mimetype)) {
      const format = path.extname(file.originalname);
      const filename = new Date().getTime().toString() + format;
      cb(null, filename);
    } else {
      cb(new createHttpError.BadRequest("format of pictures are wrong!"));
    }
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 3 * 1000 * 1000,
  },
});
export default upload;
