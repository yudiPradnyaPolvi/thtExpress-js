const express = require("express");
const app = express.Router();
const multer = require("multer");
const path = require("path");
const http = require("http");
const databaseProduct = require("./database/produk/konten");

const uploadCtrl = require("./controller/upload.v2");
const upload = multer({ dest: path.resolve("./tmp") });

const server = http.createServer((req, res) => {
  const url = require("url");
  const reqUrl = req.url;
  const { pathname, query } = url.parse(reqUrl, true);
  //root path (/)

  app.get("/baca", function (req, res) {
    const dataProduk = fetch();
    setResponse(res, 200, dataProduk, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.send("Mengambil semua data produk");
  });

  app.post("/tambah", function (req, res) {
    let requestBody = "";
    req.on("data", (chunk) => {
      requestBody += chunk.toString();
    });
    req.on("end", () => {
      requestBody = JSON.parse(requestBody);
      create(requestBody);
    });
    res.send("Menyimpan data produk");
  });

  app.put("/ubah", function (req, res) {
    let requestBody = "";
    req.on("data", (chunk) => {
      requestBody += chunk.toString();
    });
    req.on("end", () => {
      const data = fetch();
      const id = query.id;
      requestBody = JSON.parse(requestBody);
      update(requestBody, id);
    });
    res.send("Mengubah data produk");
  });

  app.patch("/", function (req, res) {
    res.send("hello world dari method patch");
  });

  app.delete("/hapus", function (req, res) {
    const id = query.id;
    destroy(id);

    res.send("Mengapus data");
  });
});
function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, function (key, value) {
    if (typeof value === dataProduk && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}
app.get("/baca", databaseProduct.fetch);
app.post("/tambah", databaseProduct.create);
app.get("/baca", databaseProduct.create);
app.put("/ubah", databaseProduct.update);
app.delete("/hapus", databaseProduct.destroy);

app.post("/upload-gambar", upload.single("image"), uploadCtrl.uploadGambar);
module.exports = app;
