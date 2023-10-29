const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.APP_PASS
  }
});

const sendEmail = async (req, res) => {
  try {
    const { studentData, picNames } = req.body;

    const createList = (dataToConvert) => {
      const generateString = `
      ${dataToConvert.name}
      Kelas: ${dataToConvert.kelas}
      Jurusan: ${dataToConvert.jurusan}
      Nomor Hp: ${dataToConvert.noHp}
      Email: ${dataToConvert.email}
      Nama Sekolah: ${dataToConvert.schoolName}
      Nama Orang Tua: ${dataToConvert.parentName}
      Nama Kepala Sekolah: ${dataToConvert.namaKepalaSekolah}
      Nama Paket: ${dataToConvert.packageName}
    `;

      return generateString;
    };

    const mailData = {
      from: "sumatif.com",
      to: process.env.SEND_GMAIL,
      subject: studentData[0].packageName,
      text: `
          ${createList(studentData[0])}
          ${createList(studentData[1])}
          ${createList(studentData[2])}
          ${createList(studentData[3])}
          ${createList(studentData[4])}
          ${createList(studentData[5])}
          ${createList(studentData[6])}
          ${createList(studentData[7])}
          ${createList(studentData[8])}
          ${createList(studentData[9])}

          Nama PIC: ${picNames}
        `
    };

    await transporter.sendMail(mailData);

    return res.status(200).send({
      status: "success",
      data: "Complete to send"
    });
  } catch (error) {
    console.log(error);

    return res.status(400).send({
      status: "failed",
      message: "Error occurred on the server, try again later."
    });
  }
};

module.exports = { sendEmail };
