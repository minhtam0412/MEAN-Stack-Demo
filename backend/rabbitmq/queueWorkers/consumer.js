const fs = require("fs");
const sharp = require("sharp");
const {promisify} = require("util");
const Broker = require("../rabbitMQ");
const {fileExists} = require("../utils/function");
const path = require("path");
const RMQConsumer = new Broker().init();
const pipeline = promisify(require("stream").pipeline);
const EXCHANGE = "upload";

/**
 * Process 1:1 message and stores in db, also processes group messages 1 by 1
 * @param {String} payload - message in json string format
 * @param {Function} ack - callback function
 */
const handleImage = async (payload, ack) => {
  try {
    const fileName = payload.content.toString();
    const dir = path.join(__dirname, '../../uploads/original');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const fileUrl = `${dir}/${fileName}`;

    // we first need to make sure if the file exist and is readable
    const exists = await fileExists(fileUrl);

    if (!exists) {
      ack();
      throw new Error(`ERR:FILE ${fileUrl} not readable`);
    }
    // we create a read stream
    const readStream = fs.createReadStream(fileUrl);

    let transform = sharp();

    const [width, height] = [400, 300];

    // we resize 1/2 the image
    transform = transform.resize(Math.round(width * 0.5));

    const dirThumb = path.join(__dirname, '../../uploads/thumbnail');
    if (!fs.existsSync(dirThumb)) {
      console.log(`Created dir path: ${dirThumb}`);
      fs.mkdirSync(dirThumb);
    }
    // we pipe our readstream to a writestream
    pipeline(readStream.pipe(transform), fs.createWriteStream(`${dirThumb}/${fileName}`));
    // we acknowledge the delivery
    ack();
  } catch (error) {
    console.error('Error handleImage', error);
  }
};

async function processUploads() {
  try {
    console.log('Consumer processUploads started');
    const consumer = await RMQConsumer;
    await consumer.createEx({
      name: EXCHANGE, type: "direct",
    });
    await consumer.subscribe({exchange: "upload", bindingKey: "image"}, handleImage);
  } catch (error) {
    console.log('Error processUploads', error);
  }
}

processUploads();

// close channek, connection on exit
process.on("exit", (code) => {
  RMQConsumer.channel.close();
  RMQConsumer.connection.close();
});
