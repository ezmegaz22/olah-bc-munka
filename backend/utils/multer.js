import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else
    ({
      error:
        "Nemtámogatott fájl formátum, kérlek JPEG/JPG vagy PNG-t használj!",
    }),
      false;
};

const upload = multer({
  storage,
  limits: { fieldSize: 1024 * 1024 }, // felbontas
  fileFilter,
});

export default upload;
