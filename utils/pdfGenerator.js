const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

function generateIDCards(res, students) {
  const doc = new PDFDocument({ margin: 10 });
  const cardWidth = 250;
  const cardHeight = 150;
  const cardsPerPage = 10;
  const padding = 10;

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=student_id_cards.pdf');

  doc.pipe(res);

  students.forEach((student, index) => {
    const pageOffset = index % cardsPerPage === 0;

    if (pageOffset && index > 0) doc.addPage();

    const position = index % cardsPerPage;
    const x = (position % 2) * (cardWidth + padding);
    const y = Math.floor(position / 2) * (cardHeight + padding);

    doc.rect(x, y, cardWidth, cardHeight)
      .strokeColor('black')
      .lineWidth(1)
      .stroke();

    doc.rect(x, y, cardWidth, 40)
      .fillOpacity(1)
      .fillColor('#f0f0f0')
      .fill();

    const logoPath = path.join(__dirname, '..', 'assets', 'img', 'logo.png');
    const defaultProfilePath = path.join(__dirname, '..', 'assets', 'img', 'default-profile.jpg');

    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, x + 5, y + 5, { width: 30 });
    } else {
      console.error(`Logo file not found at ${logoPath}`);
    }

    doc.fillColor('#f15a29')
      .fontSize(10)
      .font('Helvetica-Bold')
      .text('Sample School Name', x + 40, y + 5, { width: cardWidth - 45 });
    doc.fillColor('black')
      .fontSize(8)
      .font('Helvetica')
      .text('School address, Pin: 40000', x + 40, y + 20, { width: cardWidth - 45 });

    const profilePicSize = 50;
    if (fs.existsSync(defaultProfilePath)) {
      doc.image(defaultProfilePath, x + 5, y + 50, { width: profilePicSize });
    } else {
      console.error(`Default profile image missing at ${defaultProfilePath}`);
    }

    doc.fillColor('#002c53')
      .fontSize(10)
      .font('Helvetica-Bold')
      .text(student.name, x + profilePicSize + 10, y + 50, { width: cardWidth - profilePicSize - 15 });
    doc.fillColor('black').fontSize(8)
      .font('Helvetica')
      .text(`ID: ${student.id}`, x + profilePicSize + 10, y + 65, { width: cardWidth - profilePicSize - 15 });
    doc.fillColor('black').fontSize(8)
      .font('Helvetica')
      .text(`Email: ${student.email}`, x + profilePicSize + 10, y + 80, { width: cardWidth - profilePicSize - 15 });
    doc.fillColor('black').fontSize(8)
      .font('Helvetica')
      .text(`Phone: ${student.phone}`, x + profilePicSize + 10, y + 95, { width: cardWidth - profilePicSize - 15 });
  });

  doc.end();
}

module.exports = generateIDCards;
