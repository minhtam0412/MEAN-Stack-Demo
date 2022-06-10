const fs = require('fs')
const {promisify} = require("util");
const {v4: uuid} = require("uuid");
const path = require("path");

exports.fileExists = (path, flag = 1) => {
  return new Promise(function (resolve, reject) {
    let accessConst = null
    if (flag === 2) accessConst = fs.constants.W_OK; else accessConst = fs.constants.R_OK
    fs.access(path, accessConst, (err) => {
      if (err) {
        if (err.code === 'ENOENT') resolve(false); else reject(err)
      } else resolve(true)
    })
  })
}

exports.publishToExchange = async (instance, {message, routingKey}) => {
  try {
    await instance.createEx({
      name: process.env.EXCHANGE, type: 'direct'
    })

    await instance.publish({
      ex: process.env.EXCHANGE, routingKey: process.env.BINDING_KEY
    }, message)

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

exports.saveImage = (data) => {
  const writeFile = promisify(fs.writeFile)
  return new Promise((resolve, reject) => {
    if (!data) {
      reject("File not available!");
    }
    try {

      const dirUpload = path.join(__dirname, '../../uploads');
      if (!fs.existsSync(dirUpload)) {
        console.log(`Created dir path: ${dirUpload}`);
        fs.mkdirSync(dirUpload);
      }

      const fileName = `img_${uuid()}.jpg`;

      const dir = path.join(__dirname, '../../uploads/original');
      if (!fs.existsSync(dir)) {
        console.log(`Created dir path: ${dir}`);
        fs.mkdirSync(dir);
      }

      writeFile(`${dir}/${fileName}`, data);

      resolve(fileName);
    } catch (error) {
      console.log('Error saveImage', error);
    }
  });
};
