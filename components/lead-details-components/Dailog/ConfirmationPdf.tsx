"use client";
import React, { useEffect } from "react";
import { jsPDF } from "jspdf";

interface ConfirmationPdfProps {
  formData: {
    name: string;
    address: string;
    date: string;
    amount: string;
    rupeesInWords: string;
    unitNo: string;
    area: string;
    floor: string;
    buildingType: string;
    bankName: string;
    branch: string;
    transactionNo: string;
  };
}

const ConfirmationPdf: React.FC<ConfirmationPdfProps> = ({ formData }) => {
  function numberToWords(num: number): string {
    if (isNaN(num)) return "";
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const inWords = (n: number): string => {
      if (n < 20) return a[n];
      if (n < 100)
        return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000)
        return (
          a[Math.floor(n / 100)] +
          " Hundred" +
          (n % 100 ? " and " + inWords(n % 100) : "")
        );
      if (n < 100000)
        return (
          inWords(Math.floor(n / 1000)) +
          " Thousand" +
          (n % 1000 ? " " + inWords(n % 1000) : "")
        );
      if (n < 10000000)
        return (
          inWords(Math.floor(n / 100000)) +
          " Lakh" +
          (n % 100000 ? " " + inWords(n % 100000) : "")
        );
      return (
        inWords(Math.floor(n / 10000000)) +
        " Crore" +
        (n % 10000000 ? " " + inWords(n % 10000000) : "")
      );
    };
    return inWords(num) + " Rupees only";
  }
  useEffect(() => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};


    const leftMargin = 80;
    const rightMargin = 80;
    const topMargin = 100;
    const pageWidth = doc.internal.pageSize.getWidth();
    const contentWidth = pageWidth - leftMargin - rightMargin;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const dateLabel = `Date:${formatDate(formData.date)} `;
    const textWidth = doc.getTextWidth(dateLabel);
    const dateX = pageWidth - rightMargin - textWidth;
    const dateY = topMargin;
    doc.text(dateLabel, dateX, dateY);

    let y = topMargin;
    y += 20;
    doc.text("Mr. ____________________", leftMargin, y);
    y += 15;
    doc.text("________________________", leftMargin, y);
    y += 15;
    doc.text("________________________", leftMargin, y);
    y += 15;
    doc.text("________________________", leftMargin, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    y = 200;
    doc.text("Subject: Confirmation of Expression of Interest", pageWidth / 2, y, {
      align: "center",
    });

    y += 15;
    doc.text(
      `Reference: Letter for Expression of Interest dated ${formatDate(formData.date)}`,
      pageWidth / 2,
      y,
      { align: "center" }
    );

    doc.setFont("helvetica", "normal");
    y += 13;
    doc.text("Dear Madam,", leftMargin, y);

    y += 20;

    const para1 = `We acknowledge with thanks the receipt of the above referred Letter in relation to the proposed ‘Residential cum Commercial Project’ to be developed by E.V. Homes Constructions Private Limited on Plot No. 11, admeasuring 11,164.52 sq. meters, situated at Sector 9, Vashi, Navi Mumbai (“Plot”), allotted by CIDCO.`;

    const para2 = `We hereby confirm having noted the terms and conditions contained in your Expression of Interest, including but not limited to:`;

    const drawJustifiedText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ) => {
      const lines = doc.splitTextToSize(text, maxWidth);
      const spaceWidth = doc.getTextWidth(" ");
      lines.forEach((line: string, i: number) => {
        if (i === lines.length - 1 || !line.includes(" ")) {
          doc.text(line, x, y);
        } else {
          const words = line.split(" ");
          const lineTextWidth = doc.getTextWidth(line.replace(/\s+/g, " "));
          const extraSpace = (maxWidth - lineTextWidth) / (words.length - 1);
          let currentX = x;
          words.forEach((word: string) => {
            doc.text(word, currentX, y);
            currentX += doc.getTextWidth(word) + spaceWidth + extraSpace;
          });
        }
        y += lineHeight;
      });
      return y;
    };

    const drawSubpoint = (label: string, text: string, yStart: number) => {
      const subNumIndent = leftMargin + 55;
      const subTextIndent = leftMargin + 75;
      const subLineHeight = 14;
      doc.text(label, subNumIndent, yStart);
      const lines = doc.splitTextToSize(text, contentWidth - (subTextIndent - leftMargin));
      const spaceWidth = doc.getTextWidth(" ");
      let yy = yStart;
      lines.forEach((line: string, i: number) => {
        if (i === lines.length - 1 || !line.includes(" ")) {
          doc.text(line, subTextIndent, yy);
        } else {
          const words = line.split(" ");
          const lineTextWidth = doc.getTextWidth(line.replace(/\s+/g, " "));
          const extraSpace =
            (contentWidth - (subTextIndent - leftMargin) - lineTextWidth) /
            (words.length - 1);
          let currentX = subTextIndent;
          words.forEach((word: string) => {
            doc.text(word, currentX, yy);
            currentX += doc.getTextWidth(word) + spaceWidth + extraSpace;
          });
        }
        yy += subLineHeight;
      });
      return yy;
    };

    y = drawJustifiedText(para1, leftMargin, y, contentWidth, 14);
    y = drawJustifiedText(para2, leftMargin, y, contentWidth, 14) + 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const numIndent = leftMargin + 20;
    const textIndent = leftMargin + 40;
    const lineHeight = 14;

    const points = [
      `Your offer of providing financial assistance of Rs. ${formData.amount} (Rupees ${numberToWords(Number(formData.amount))}). to M/s. E.V. Homes.`,
      "The agreed interest rate of 12% per annum on the said financial assistance, subject to the terms mentioned in your letter.",
      "Your option either to ",
    ];

    points.forEach((text, index) => {
      const number = `${index + 1}.`;
      doc.text(number, numIndent, y);
      const wrappedLines = doc.splitTextToSize(text, contentWidth - (textIndent - leftMargin));
      wrappedLines.forEach((line: string, i: number) => {
        if (i === wrappedLines.length - 1 || !line.includes(" ")) {
          doc.text(line, textIndent, y);
        } else {
          const words = line.split(" ");
          const lineTextWidth = doc.getTextWidth(line.replace(/\s+/g, " "));
          const extraSpace =
            (contentWidth - (textIndent - leftMargin) - lineTextWidth) /
            (words.length - 1);
          const spaceWidth = doc.getTextWidth(" ");
          let currentX = textIndent;
          words.forEach((word: string) => {
            doc.text(word, currentX, y);
            currentX += doc.getTextWidth(word) + spaceWidth + extraSpace;
          });
        }
        y += lineHeight;
      });
      y += 6;
    });

    y = drawSubpoint(
      "i.",
      "Seek refund of the said financial assistance along with accrued interest upon maturity, or",
      y
    ) + 3;

    y = drawSubpoint(
      "ii.",
      `Convert the same into consideration for acquiring a commercial unit bearing Unit No ${formData.unitNo}, admeasuring ${formData.area} sq. mtrs. carpet area, on ${formData.floor} floor of ${formData.buildingType} (Incentive/Rehab) building in the proposed project to be constructed on the said Plot, at the price stipulated in your Expression of Interest. (The details of the said Unit are as stated in the tentative building plan and may change subject to plan approval from the concerned authority.)`,
      y
    );

    y += 10;
    const number4 = "4.";
    doc.text(number4, numIndent, y);
    const point4Text = `Your right to exercise the aforesaid option within 30 (thirty) days of receipt of commencement certificate, subject to applicable charges, duties, and taxes as specified therein.`;
    const wrappedLines4 = doc.splitTextToSize(
      point4Text,
      contentWidth - (textIndent - leftMargin)
    );
    wrappedLines4.forEach((line: string, i: number) => {
      if (i === wrappedLines4.length - 1 || !line.includes(" ")) {
        doc.text(line, textIndent, y);
      } else {
        const words = line.split(" ");
        const lineTextWidth = doc.getTextWidth(line.replace(/\s+/g, " "));
        const extraSpace =
          (contentWidth - (textIndent - leftMargin) - lineTextWidth) /
          (words.length - 1);
        const spaceWidth = doc.getTextWidth(" ");
        let currentX = textIndent;
        words.forEach((word: string) => {
          doc.text(word, currentX, y);
          currentX += doc.getTextWidth(word) + spaceWidth + extraSpace;
        });
      }
      y += 14;
    });

    y += 10;
    const para3 = `We further confirm that the said financial assistance will be treated as an unsecured loan in the books of accounts of M/s. E.V. Homes until such time as you intimate your decision to either redeem or convert the same into consideration for purchasing the abovementioned commercial unit. The Receipt of the said financial assistance is enclosed with this letter.`;
    y = drawJustifiedText(para3, leftMargin, y, contentWidth, 14);

    y += 15;
    doc.text("Thanking you,", leftMargin, y);

    y += 15;
    doc.text("For M/s. E.V. Homes,", leftMargin, y);
    y += 30;
    doc.text("(__________________)", leftMargin, y);

    y += 18;
    doc.text("Proprietor", leftMargin, y);
    y += 20;
  const enclosureText = `Enclosure: Receipt of Rs. ${formData.amount} (Rupees ${numberToWords(
  Number(formData.amount)
)}) in favour of E.V. Homes.`;

// Split into multiple lines (in case text is long)
const enclosureLines = doc.splitTextToSize(enclosureText, contentWidth);
// const lineHeight = 14;

// Draw text line by line
enclosureLines.forEach((line: string, i: number) => {
  const yPos = y + i * lineHeight;

  // Draw the text normally
  doc.text(line, leftMargin, yPos);

  // Only underline the word “Enclosure:” in the FIRST line
  if (i === 0 && line.includes("Enclosure:")) {``
    const underlineWidth = doc.getTextWidth("Enclosure:");
    const underlineY = yPos + 1.5; // slight offset below text baseline
    doc.line(leftMargin, underlineY, leftMargin + underlineWidth, underlineY);
  }
});

y += enclosureLines.length * lineHeight;


    doc.addPage();

    const newPageTopMargin = 150;
    const newPageLeftMargin = 80;
    const newPageRightMargin = 80;
    const newPageContentWidth = pageWidth - newPageLeftMargin - newPageRightMargin;
    let y2 = newPageTopMargin;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    const receiptText = "R E C E I P T";
    doc.text(receiptText, pageWidth / 2, y2, { align: "center" });
    const receiptTextWidth = doc.getTextWidth(receiptText);
    const underlineY = y2 + 1;
    const startX = pageWidth / 2 - receiptTextWidth / 2;
    const endX = pageWidth / 2 + receiptTextWidth / 2;
    doc.line(startX, underlineY, endX, underlineY);
    y2 += 40;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    let receivedTextY = y2;
    const paragraphLeft = leftMargin;
    const paragraphWidth = contentWidth;
    const receivedText = `RECEIVED from Mr. _________________________ a sum of Rs. ${formData.amount} (Rupees ${numberToWords(Number(formData.amount))}) being the financial assistance / invested amount, towards the option of allotting a Commercial Unit bearing Unit No. ${formData.unitNo}, admeasuring ${formData.area} sq. mtrs. carpet area, on ${formData.floor} floor of ${formData.buildingType} (Incentive/Rehab) building in the Project to be constructed on Plot No. 11 admeasuring 11,164.52 Sq. Meters and thereabouts situated at Sector - 9, Vashi, Navi Mumbai. (The details of the said Unit are as stated in the tentative building plan and may change subject to plan approval from the concerned authority.) The details of receipt of said financial assistance / invested amount is as under:`;
    const lines = doc.splitTextToSize(receivedText, paragraphWidth);
    const spaceWidth = doc.getTextWidth(" ");
    lines.forEach((line: string, i: number) => {
      const words = line.split(" ");
      const lineTextWidth = doc.getTextWidth(line.replace(/\s+/g, " "));
      const isLastLine = i === lines.length - 1;
      const extraSpace =
        !isLastLine && words.length > 1
          ? (paragraphWidth - lineTextWidth) / (words.length - 1)
          : 0;
      let currentX = paragraphLeft;
      words.forEach((word: string) => {
        if (
          word === "RECEIVED" ||
          word.startsWith("Mr.") ||
          word.startsWith("Rs.") ||
          word.includes("(Rupees") ||
          word.includes("Only)")
        ) {
          doc.setFont("helvetica", "bold");
        } else if (
          word.includes("(The") ||
          word.includes("details") ||
          word.includes("tentative") ||
          word.includes("plan") ||
          word.includes("authority.)")
        ) {
          doc.setFont("helvetica", "italic");
        } else {
          doc.setFont("helvetica", "normal");
        }
        doc.text(word, currentX, receivedTextY);
        currentX += doc.getTextWidth(word);
        if (!isLastLine) currentX += spaceWidth + extraSpace;
        else currentX += spaceWidth;
      });
      receivedTextY += lineHeight;
    });

    y2 = receivedTextY + 20;
    const tableTop = y2;
    const colWidths = [110, 80, 150, 100];
    const rowHeight = 30;
    const headers = ["Transaction No.", "Date", "Bank and Branch", "Amount"];
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    let x = leftMargin;

    // Draw table headers
    headers.forEach((header, i) => {
      doc.rect(x, tableTop, colWidths[i], rowHeight);
      const textWidth = doc.getTextWidth(header);
      const textX = x + (colWidths[i] - textWidth) / 2;
      const textY = tableTop + rowHeight / 1.5;
      doc.text(header, textX, textY);
      x += colWidths[i];
    });

    // Prepare table data (from your form)
    const tableData = [
      [
        formData.transactionNo || "",
      formatDate(formData.date) || "",
        `${formData.bankName || ""}, ${formData.branch || ""}`,
        formData.amount || "",
      ],
    ];

    // Draw table data rows
    let yRow = tableTop + rowHeight;
    doc.setFont("helvetica", "normal");

    tableData.forEach((row) => {
      let x = leftMargin;
      row.forEach((cell, i) => {
        doc.rect(x, yRow, colWidths[i], rowHeight);

        const textWidth = doc.getTextWidth(cell);
        const textX = x + (colWidths[i] - textWidth) / 2;
        const textY = yRow + rowHeight / 1.6;

        doc.text(cell, textX, textY);
        x += colWidths[i];
      });
      yRow += rowHeight;
    });


    y2 = yRow + rowHeight + 50;

    const receivedTextt = "I SAY RECEIVED";
    const receivedTextWidthh = doc.getTextWidth(receivedTextt);
    const receiveddX = pageWidth - rightMargin - receivedTextWidthh;
    doc.text(receivedTextt, receiveddX, y2);

    doc.setFont("helvetica", "normal");
    const receivedTextRight = "I SAY RECEIVED";
    const receivedTextWidth = doc.getTextWidth(receivedTextRight);
    const receivedX = pageWidth - rightMargin - receivedTextWidth;
    doc.text(receivedTextRight, receivedX, y2);

    y2 += 13;
    const normalText = "For ";
    const boldText = "M/s. E.V. HOMES";
    const totalTextWidth =
      doc.getTextWidth(normalText) + doc.getTextWidth(boldText);
    const forTextX = pageWidth - rightMargin - totalTextWidth;
    doc.setFont("helvetica", "normal");
    doc.text(normalText, forTextX, y2);
    doc.setFont("helvetica", "bold");
    doc.text(boldText, forTextX + doc.getTextWidth(normalText), y2);

    y2 += 35;
    doc.setFont("helvetica", "normal");
    const lineText = "(_________________)";
    const lineWidth = doc.getTextWidth(lineText);
    const lineX = pageWidth - rightMargin - lineWidth;
    doc.text(lineText, lineX, y2);

    y2 += 15;
    const propText = "Proprietor";
    const propWidth = doc.getTextWidth(propText);
    const propX = pageWidth - rightMargin - propWidth;
    doc.text(propText, propX, y2);

    const leftInfoY = y2 + 30;
    doc.text(`Date: ${formData.date} `, leftMargin, leftInfoY);
    doc.text("Place: Navi Mumbai", leftMargin, leftInfoY + 15);

    window.open(doc.output("bloburl"), "_blank");
  }, []);

  return null;
};

export default ConfirmationPdf;
