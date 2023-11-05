const nodemailer = require("nodemailer");
const logger = require("../../lib/logger");

// nodemailer js
const sendEmail = (req, res) => {
  const { studentData, picData } = req.body;

  // success transporter config
  /*
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_AUTH_USERNAME,
        pass: process.env.MAIL_AUTH_PASS
      },
      logger: true,
      debug: true
    });
  */

   let transporter = nodemailer.createTransport({
      host: "api.sumatif.com",
      port: 465,
      secure: true,
      auth: {
        user: "admin@sumatif.com",
        pass: "sumatif1225"
      },
      logger: true,
      debug: true
    });

  const createGeneratedString = (dataToConvert) => {
    const generateString = `
      Nama: ${dataToConvert.name}
      Kelas: ${dataToConvert.kelas}
      Jurusan: ${dataToConvert.jurusan}
      Nomor Hp: ${dataToConvert.noHp}
      Email: ${dataToConvert.email}
      Nama Sekolah: ${dataToConvert.schoolName}
      Nama Orang Tua: ${dataToConvert.parentName}
      Nama Kepala Sekolah: ${dataToConvert.namaKepalaSekolah}
    `;

    return generateString;
  };

  // success mail option config
  /*
  let mailOptions = {
    from: process.env.SENDER_FROM,
    to: process.env.SENDER_TO,
    subject: studentData[0].packageName,
    text: `
      ${createGeneratedString(studentData[0])}
      ${createGeneratedString(studentData[1])}
      ${createGeneratedString(studentData[2])}
      ${createGeneratedString(studentData[3])}
      ${createGeneratedString(studentData[4])}
      ${createGeneratedString(studentData[5])}
      ${createGeneratedString(studentData[6])}
      ${createGeneratedString(studentData[7])}
      ${createGeneratedString(studentData[8])}
      ${createGeneratedString(studentData[9])}

      Nama PIC: ${picData.picNames}
      No PIC: ${picData.picNumber}
      Paket: ${studentData[0].packageName}
    `
  };
  */

  let mailOptions = {
    from: "admin@sumatif.com",
    to: "marketing@sumatif.com",
    subject: studentData[0].packageName,
    text: `
      ${createGeneratedString(studentData[0])}
      ${createGeneratedString(studentData[1])}
      ${createGeneratedString(studentData[2])}
      ${createGeneratedString(studentData[3])}
      ${createGeneratedString(studentData[4])}
      ${createGeneratedString(studentData[5])}
      ${createGeneratedString(studentData[6])}
      ${createGeneratedString(studentData[7])}
      ${createGeneratedString(studentData[8])}
      ${createGeneratedString(studentData[9])}

      Nama PIC: ${picData.picNames}
      No PIC: ${picData.picNumber}
      Paket: ${studentData[0].packageName}
    `
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      logger.error(err.message);

      return res.status(500).send({
        status: "failed",
        message: "Transaksi tidak berhasil di kirim, cobalah beberapa saat lagi"
      });
    }

    logger.info(`Email successfully sent!, info: ${info.response}`);

    return res
      .status(200)
      .send({ status: "success", message: "data completely sent!" });
  });
};

module.exports = { sendEmail };
